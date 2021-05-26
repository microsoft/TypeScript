// TypeScript not expose TypeConstructor
enum TypeFlag {
    AppliedType = 1 << 0,
    TypeBounds = 1 << 1,
    TypeParamRef = 1 << 2,
    TypeVar = 1 << 3,
}

interface Type {
}

/// A type application `TC[T_1, ..., T_n]`
interface AppliedType extends Type {
    typeConstructor: Type,      // In fact, typeConstructor must be a type lambda now.
    arguments: Type[]
}

interface TypeMapper { }

interface TypeBounds extends Type {
    upperBound: Type;
    // lowerBound: Type
    // ATTENTION. In dotty(Scala3 compiler), it define `&` and `|` opeator, which use logic
    // &(that: ) => TypeBounds(this.lo | that.lo, this.hi & that.hi)
    // | => TypeBounds(this.lo & that.lo, this.hi | that.hi)
}

interface TypeParamRef extends Type {
    binder: TypeLambda;
    paramNum: number;
}

/** In a TypeApply tree, a TypeVar is created for each argument type to be inferred.
 *  Every type variable is referred to by exactly one inferred type parameter of some
 *  TypeApply tree.
 *
 *  A type variable is essentially a switch that models some part of a substitution.
 *  It is first linked to `origin`, a poly param that's in the current constraint set.
 *  It can then be (once) instantiated to some other type. The instantiation is
 *  recorded in the type variable itself, or else, if the current type state
 *  is different from the variable's creation state (meaning unrolls are possible)
 *  in the current typer state.
 *
 *  @param  origin        The parameter that's tracked by the type variable.
 *  @param  creatorState  The typer state in which the variable was created.
 */
interface TypeVar extends Type {
    currentOrigin: TypeParamRef;
    isInstantited: Boolean;
    /** The permanent instance type of the variable, or NoType is none is given yet */
    myInst: Type;// = NoType;
    /** Instantiate variable with given type */
    instantiateWith(type: Type): Type;
    // scala
    // {assert(tp ne this, s"self instantiation of ${tp.show}, constraint = ${ctx.typerState.constraint.show}")
    // typr.println(s"instantiating ${this.show} with ${tp.show}")
    // if ((ctx.typerState eq owningState.get) && !TypeComparer.subtypeCheckInProgress)
    //   inst = tp
    // ctx.typerState.constraint = ctx.typerState.constraint.replace(origin, tp)
    // tp}
}


// type lambda is just type constructor, which takes type as parameter and return type.
interface TypeLambda extends Type {
    paramNames: string[];
    paramInfos: TypeBounds[];
    param: { name: string, bounds: TypeBounds }[];
    /**
     * must be a proper type.
     */
    resType: Type;
    /**
     * Always get this from getter function `GetTypeParamRefFromTypeLambda`
     */
    paramRefs: TypeParamRef[];
}

function GetTypeParamRefFromTypeLambda(tl: TypeLambda) {
    if (!!tl.paramRefs) {
        const tmpParamRefs: TypeParamRef[] = [];
        for (const index in tl.paramNames) {
            tmpParamRefs[index] = { binder: tl, paramNum: parseInt(index) };
        }
        tl.paramRefs = tmpParamRefs;
    }
    return tl.paramRefs;
}

// Constraint of "A" ($"{ConstraintA}") <: Constraint of "B" ($"ConstraintB")
// trait TermLambda extends LambdaType {}

// trait TypeLambda extends LambdaType {
//     type ThisName = TypeName
//     type PInfo = TypeBounds
//     type This <: TypeLambda
//     type ParamRefType = TypeParamRef

//     def isResultDependent(using Context): Boolean = true
//     def isParamDependent(using Context): Boolean = true

//     def newParamRef(n: Int): TypeParamRef = new TypeParamRefImpl(this, n)

//     @threadUnsafe lazy val typeParams: List[LambdaParam] =
//       paramNames.indices.toList.map(new LambdaParam(this, _))

//     def derivedLambdaAbstraction(paramNames: List[TypeName], paramInfos: List[TypeBounds], resType: Type)(using Context): Type =
//       resType match {
//         case resType: AliasingBounds =>
//           resType.derivedAlias(newLikeThis(paramNames, paramInfos, resType.alias))
//         case resType @ TypeBounds(lo, hi) =>
//           resType.derivedTypeBounds(
//             if (lo.isRef(defn.NothingClass)) lo else newLikeThis(paramNames, paramInfos, lo),
//             newLikeThis(paramNames, paramInfos, hi))
//         case _ =>
//           derivedLambdaType(paramNames, paramInfos, resType)
//       }
//   }

// trait LambdaType extends BindingType with TermType { self =>
//     type ThisName <: Name
//     type PInfo <: Type
//     type This <: LambdaType{type PInfo = self.PInfo}
//     type ParamRefType <: ParamRef

//     def paramNames: List[ThisName]
//     def paramInfos: List[PInfo]
//     def resType: Type
//     protected def newParamRef(n: Int): ParamRefType

//     override def resultType(using Context): Type = resType

//     def isResultDependent(using Context): Boolean
//     def isParamDependent(using Context): Boolean

//     final def isTermLambda: Boolean = isInstanceOf[TermLambda]
//     final def isTypeLambda: Boolean = isInstanceOf[TypeLambda]
//     final def isHigherKinded: Boolean = isInstanceOf[TypeProxy]

//     private var myParamRefs: List[ParamRefType] = null

//     def paramRefs: List[ParamRefType] = {
//       if myParamRefs == null then
//         def recur(paramNames: List[ThisName], i: Int): List[ParamRefType] =
//           paramNames match
//             case _ :: rest => newParamRef(i) :: recur(rest, i + 1)
//             case _ => Nil
//         myParamRefs = recur(paramNames, 0)
//       myParamRefs
//     }

//     /** Like `paramInfos` but substitute parameter references with the given arguments */
//     final def instantiateParamInfos(argTypes: => List[Type])(using Context): List[Type] =
//       if (isParamDependent) paramInfos.mapConserve(_.substParams(this, argTypes))
//       else paramInfos

//     /** Like `resultType` but substitute parameter references with the given arguments */
//     final def instantiate(argTypes: => List[Type])(using Context): Type =
//       if (isResultDependent) resultType.substParams(this, argTypes)
//       else resultType

//     def companion: LambdaTypeCompanion[ThisName, PInfo, This]

//     /** The type `[tparams := paramRefs] tp`, where `tparams` can be
//      *  either a list of type parameter symbols or a list of lambda parameters
//      */
//     def integrate(tparams: List[ParamInfo], tp: Type)(using Context): Type =
//       (tparams: @unchecked) match {
//         case LambdaParam(lam, _) :: _ => tp.subst(lam, this)
//         case params: List[Symbol @unchecked] => tp.subst(params, paramRefs)
//       }

//     final def derivedLambdaType(paramNames: List[ThisName] = this.paramNames,
//                           paramInfos: List[PInfo] = this.paramInfos,
//                           resType: Type = this.resType)(using Context): LambdaType =
//       if ((paramNames eq this.paramNames) && (paramInfos eq this.paramInfos) && (resType eq this.resType)) this
//       else newLikeThis(paramNames, paramInfos, resType)

//     def newLikeThis(paramNames: List[ThisName], paramInfos: List[PInfo], resType: Type)(using Context): This =
//       def substParams(pinfos: List[PInfo], to: This): List[PInfo] = pinfos match
//         case pinfos @ (pinfo :: rest) =>
//           pinfos.derivedCons(pinfo.subst(this, to).asInstanceOf[PInfo], substParams(rest, to))
//         case nil =>
//           nil
//       companion(paramNames)(
//           x => substParams(paramInfos, x),
//           x => resType.subst(this, x))

//     protected def prefixString: String
//     override def toString: String = s"$prefixString($paramNames, $paramInfos, $resType)"
//   }


/** Distributes Lambda inside type bounds. Examples:
 *
 *      type T[X] = U        becomes    type T = [X] -> U
 *      type T[X] <: U       becomes    type T >: Nothing <: ([X] -> U)
 *      type T[X] >: L <: U  becomes    type T >: ([X] -> L) <: ([X] -> U)
 *
 *  The variances of regular TypeBounds types, as well as of match aliases
 *  and of opaque aliases are always determined from the given parameters
 *  `params`. The variances of other type aliases are determined from
 *  the given parameters only if one of these parameters carries a `+`
 *  or `-` variance annotation. Type aliases without variance annotation
 *  are treated structurally. That is, their parameter variances are
 *  determined by how the parameter(s) appear in the result type.
 *
 *  Examples:
 *
 *    type T[X] >: A              // X is invariant
 *    type T[X] <: List[X]        // X is invariant
 *    type T[X] = List[X]         // X is covariant (determined structurally)
 *    opaque type T[X] = List[X]  // X is invariant
 *    opaque type T[+X] = List[X] // X is covariant
 *    type T[A, B] = A => B       // A is contravariant, B is covariant (determined structurally)
 *    type T[A, +B] = A => B      // A is invariant, B is covariant
 */

// type Set[T]
// type Set T => T
// type T[X] >: L <: U
// becomes type T >: ([X] =>> L) <: ([X] =>> U)
// type T[X] <: X => X
// becomes type T >: Nothing <: ([X] =>> X => X)
// [F[X] <: Coll[X]]
// becomes [F >: Nothing <: [X] =>> Coll[X]]

// def boundsFromParams[PI <: ParamInfo.Of[TypeName]](params: List[PI], bounds: TypeBounds)(using Context): TypeBounds = {
//     def expand(tp: Type, useVariances: Boolean) =
//       if params.nonEmpty && useVariances then
//         apply(params.map(_.paramName), params.map(_.paramVariance))(
//           tl => params.map(param => toPInfo(tl.integrate(params, param.paramInfo))),
//           tl => tl.integrate(params, tp))
//       else
//         super.fromParams(params, tp)
//     def isOpaqueAlias = params match
//       case (param: Symbol) :: _ => param.owner.is(Opaque)
//       case _ => false
//     bounds match {
//       case bounds: MatchAlias =>
//         bounds.derivedAlias(expand(bounds.alias, true))
//       case bounds: TypeAlias =>
//         bounds.derivedAlias(expand(bounds.alias,
//           isOpaqueAlias || params.exists(!_.paramVariance.isEmpty)))
//       case TypeBounds(lo, hi) =>
//         bounds.derivedTypeBounds(
//           if lo.isRef(defn.NothingClass) then lo else expand(lo, true),
//           expand(hi, true))
//     }
//   }
// }

