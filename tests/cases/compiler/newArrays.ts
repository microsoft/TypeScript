module M {
	class Foo {}
	class Gar {
		public fa: Foo[];
		public x = 10;
		public y = 10;

		public m () {
			this.fa = new Array<Foo>(this.x * this.y);		
		}
	}
}