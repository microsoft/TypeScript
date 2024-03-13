//// [tests/cases/compiler/conditionalTypeDiscriminatingLargeUnionRegularTypeFetchingSpeedReasonable.ts] ////

//// [conditionalTypeDiscriminatingLargeUnionRegularTypeFetchingSpeedReasonable.ts]
type BigUnion =
    {
        name: '0';
        children: BigUnion[];
    } |
    {
        name: '1';
        children: BigUnion[];
    } |
    {
        name: '2';
        children: BigUnion[];
    } |
    {
        name: '3';
        children: BigUnion[];
    } |
    {
        name: '4';
        children: BigUnion[];
    } |
    {
        name: '5';
        children: BigUnion[];
    } |
    {
        name: '6';
        children: BigUnion[];
    } |
    {
        name: '7';
        children: BigUnion[];
    } |
    {
        name: '8';
        children: BigUnion[];
    } |
    {
        name: '9';
        children: BigUnion[];
    } |
    {
        name: '10';
        children: BigUnion[];
    } |
    {
        name: '11';
        children: BigUnion[];
    } |
    {
        name: '12';
        children: BigUnion[];
    } |
    {
        name: '13';
        children: BigUnion[];
    } |
    {
        name: '14';
        children: BigUnion[];
    } |
    {
        name: '15';
        children: BigUnion[];
    } |
    {
        name: '16';
        children: BigUnion[];
    } |
    {
        name: '17';
        children: BigUnion[];
    } |
    {
        name: '18';
        children: BigUnion[];
    } |
    {
        name: '19';
        children: BigUnion[];
    } |
    {
        name: '20';
        children: BigUnion[];
    } |
    {
        name: '21';
        children: BigUnion[];
    } |
    {
        name: '22';
        children: BigUnion[];
    } |
    {
        name: '23';
        children: BigUnion[];
    } |
    {
        name: '24';
        children: BigUnion[];
    } |
    {
        name: '25';
        children: BigUnion[];
    } |
    {
        name: '26';
        children: BigUnion[];
    } |
    {
        name: '27';
        children: BigUnion[];
    } |
    {
        name: '28';
        children: BigUnion[];
    } |
    {
        name: '29';
        children: BigUnion[];
    } |
    {
        name: '30';
        children: BigUnion[];
    } |
    {
        name: '31';
        children: BigUnion[];
    } |
    {
        name: '32';
        children: BigUnion[];
    } |
    {
        name: '33';
        children: BigUnion[];
    } |
    {
        name: '34';
        children: BigUnion[];
    } |
    {
        name: '35';
        children: BigUnion[];
    } |
    {
        name: '36';
        children: BigUnion[];
    } |
    {
        name: '37';
        children: BigUnion[];
    } |
    {
        name: '38';
        children: BigUnion[];
    } |
    {
        name: '39';
        children: BigUnion[];
    } |
    {
        name: '40';
        children: BigUnion[];
    } |
    {
        name: '41';
        children: BigUnion[];
    } |
    {
        name: '42';
        children: BigUnion[];
    } |
    {
        name: '43';
        children: BigUnion[];
    } |
    {
        name: '44';
        children: BigUnion[];
    } |
    {
        name: '45';
        children: BigUnion[];
    } |
    {
        name: '46';
        children: BigUnion[];
    } |
    {
        name: '47';
        children: BigUnion[];
    } |
    {
        name: '48';
        children: BigUnion[];
    } |
    {
        name: '49';
        children: BigUnion[];
    } |
    {
        name: '50';
        children: BigUnion[];
    } |
    {
        name: '51';
        children: BigUnion[];
    } |
    {
        name: '52';
        children: BigUnion[];
    } |
    {
        name: '53';
        children: BigUnion[];
    } |
    {
        name: '54';
        children: BigUnion[];
    } |
    {
        name: '55';
        children: BigUnion[];
    } |
    {
        name: '56';
        children: BigUnion[];
    } |
    {
        name: '57';
        children: BigUnion[];
    } |
    {
        name: '58';
        children: BigUnion[];
    } |
    {
        name: '59';
        children: BigUnion[];
    } |
    {
        name: '60';
        children: BigUnion[];
    } |
    {
        name: '61';
        children: BigUnion[];
    } |
    {
        name: '62';
        children: BigUnion[];
    } |
    {
        name: '63';
        children: BigUnion[];
    } |
    {
        name: '64';
        children: BigUnion[];
    } |
    {
        name: '65';
        children: BigUnion[];
    } |
    {
        name: '66';
        children: BigUnion[];
    } |
    {
        name: '67';
        children: BigUnion[];
    } |
    {
        name: '68';
        children: BigUnion[];
    } |
    {
        name: '69';
        children: BigUnion[];
    } |
    {
        name: '70';
        children: BigUnion[];
    } |
    {
        name: '71';
        children: BigUnion[];
    } |
    {
        name: '72';
        children: BigUnion[];
    } |
    {
        name: '73';
        children: BigUnion[];
    } |
    {
        name: '74';
        children: BigUnion[];
    } |
    {
        name: '75';
        children: BigUnion[];
    } |
    {
        name: '76';
        children: BigUnion[];
    } |
    {
        name: '77';
        children: BigUnion[];
    } |
    {
        name: '78';
        children: BigUnion[];
    } |
    {
        name: '79';
        children: BigUnion[];
    } |
    {
        name: '80';
        children: BigUnion[];
    } |
    {
        name: '81';
        children: BigUnion[];
    } |
    {
        name: '82';
        children: BigUnion[];
    } |
    {
        name: '83';
        children: BigUnion[];
    } |
    {
        name: '84';
        children: BigUnion[];
    } |
    {
        name: '85';
        children: BigUnion[];
    } |
    {
        name: '86';
        children: BigUnion[];
    } |
    {
        name: '87';
        children: BigUnion[];
    } |
    {
        name: '88';
        children: BigUnion[];
    } |
    {
        name: '89';
        children: BigUnion[];
    } |
    {
        name: '90';
        children: BigUnion[];
    } |
    {
        name: '91';
        children: BigUnion[];
    } |
    {
        name: '92';
        children: BigUnion[];
    } |
    {
        name: '93';
        children: BigUnion[];
    } |
    {
        name: '94';
        children: BigUnion[];
    } |
    {
        name: '95';
        children: BigUnion[];
    } |
    {
        name: '96';
        children: BigUnion[];
    } |
    {
        name: '97';
        children: BigUnion[];
    } |
    {
        name: '98';
        children: BigUnion[];
    } |
    {
        name: '99';
        children: BigUnion[];
    } |
    {
        name: '100';
        children: BigUnion[];
    } |
    {
        name: '101';
        children: BigUnion[];
    } |
    {
        name: '102';
        children: BigUnion[];
    } |
    {
        name: '103';
        children: BigUnion[];
    } |
    {
        name: '104';
        children: BigUnion[];
    } |
    {
        name: '105';
        children: BigUnion[];
    } |
    {
        name: '106';
        children: BigUnion[];
    } |
    {
        name: '107';
        children: BigUnion[];
    } |
    {
        name: '108';
        children: BigUnion[];
    } |
    {
        name: '109';
        children: BigUnion[];
    } |
    {
        name: '110';
        children: BigUnion[];
    } |
    {
        name: '111';
        children: BigUnion[];
    } |
    {
        name: '112';
        children: BigUnion[];
    } |
    {
        name: '113';
        children: BigUnion[];
    } |
    {
        name: '114';
        children: BigUnion[];
    } |
    {
        name: '115';
        children: BigUnion[];
    } |
    {
        name: '116';
        children: BigUnion[];
    } |
    {
        name: '117';
        children: BigUnion[];
    } |
    {
        name: '118';
        children: BigUnion[];
    } |
    {
        name: '119';
        children: BigUnion[];
    } |
    {
        name: '120';
        children: BigUnion[];
    } |
    {
        name: '121';
        children: BigUnion[];
    } |
    {
        name: '122';
        children: BigUnion[];
    } |
    {
        name: '123';
        children: BigUnion[];
    } |
    {
        name: '124';
        children: BigUnion[];
    } |
    {
        name: '125';
        children: BigUnion[];
    } |
    {
        name: '126';
        children: BigUnion[];
    } |
    {
        name: '127';
        children: BigUnion[];
    } |
    {
        name: '128';
        children: BigUnion[];
    } |
    {
        name: '129';
        children: BigUnion[];
    } |
    {
        name: '130';
        children: BigUnion[];
    } |
    {
        name: '131';
        children: BigUnion[];
    } |
    {
        name: '132';
        children: BigUnion[];
    } |
    {
        name: '133';
        children: BigUnion[];
    } |
    {
        name: '134';
        children: BigUnion[];
    } |
    {
        name: '135';
        children: BigUnion[];
    } |
    {
        name: '136';
        children: BigUnion[];
    } |
    {
        name: '137';
        children: BigUnion[];
    } |
    {
        name: '138';
        children: BigUnion[];
    } |
    {
        name: '139';
        children: BigUnion[];
    } |
    {
        name: '140';
        children: BigUnion[];
    } |
    {
        name: '141';
        children: BigUnion[];
    } |
    {
        name: '142';
        children: BigUnion[];
    } |
    {
        name: '143';
        children: BigUnion[];
    } |
    {
        name: '144';
        children: BigUnion[];
    } |
    {
        name: '145';
        children: BigUnion[];
    } |
    {
        name: '146';
        children: BigUnion[];
    } |
    {
        name: '147';
        children: BigUnion[];
    } |
    {
        name: '148';
        children: BigUnion[];
    } |
    {
        name: '149';
        children: BigUnion[];
    } |
    {
        name: '150';
        children: BigUnion[];
    } |
    {
        name: '151';
        children: BigUnion[];
    } |
    {
        name: '152';
        children: BigUnion[];
    } |
    {
        name: '153';
        children: BigUnion[];
    } |
    {
        name: '154';
        children: BigUnion[];
    } |
    {
        name: '155';
        children: BigUnion[];
    } |
    {
        name: '156';
        children: BigUnion[];
    } |
    {
        name: '157';
        children: BigUnion[];
    } |
    {
        name: '158';
        children: BigUnion[];
    } |
    {
        name: '159';
        children: BigUnion[];
    } |
    {
        name: '160';
        children: BigUnion[];
    } |
    {
        name: '161';
        children: BigUnion[];
    } |
    {
        name: '162';
        children: BigUnion[];
    } |
    {
        name: '163';
        children: BigUnion[];
    } |
    {
        name: '164';
        children: BigUnion[];
    } |
    {
        name: '165';
        children: BigUnion[];
    } |
    {
        name: '166';
        children: BigUnion[];
    } |
    {
        name: '167';
        children: BigUnion[];
    } |
    {
        name: '168';
        children: BigUnion[];
    } |
    {
        name: '169';
        children: BigUnion[];
    } |
    {
        name: '170';
        children: BigUnion[];
    } |
    {
        name: '171';
        children: BigUnion[];
    } |
    {
        name: '172';
        children: BigUnion[];
    } |
    {
        name: '173';
        children: BigUnion[];
    } |
    {
        name: '174';
        children: BigUnion[];
    } |
    {
        name: '175';
        children: BigUnion[];
    } |
    {
        name: '176';
        children: BigUnion[];
    } |
    {
        name: '177';
        children: BigUnion[];
    } |
    {
        name: '178';
        children: BigUnion[];
    } |
    {
        name: '179';
        children: BigUnion[];
    } |
    {
        name: '180';
        children: BigUnion[];
    } |
    {
        name: '181';
        children: BigUnion[];
    } |
    {
        name: '182';
        children: BigUnion[];
    } |
    {
        name: '183';
        children: BigUnion[];
    } |
    {
        name: '184';
        children: BigUnion[];
    } |
    {
        name: '185';
        children: BigUnion[];
    } |
    {
        name: '186';
        children: BigUnion[];
    } |
    {
        name: '187';
        children: BigUnion[];
    } |
    {
        name: '188';
        children: BigUnion[];
    } |
    {
        name: '189';
        children: BigUnion[];
    } |
    {
        name: '190';
        children: BigUnion[];
    } |
    {
        name: '191';
        children: BigUnion[];
    } |
    {
        name: '192';
        children: BigUnion[];
    } |
    {
        name: '193';
        children: BigUnion[];
    } |
    {
        name: '194';
        children: BigUnion[];
    } |
    {
        name: '195';
        children: BigUnion[];
    } |
    {
        name: '196';
        children: BigUnion[];
    } |
    {
        name: '197';
        children: BigUnion[];
    } |
    {
        name: '198';
        children: BigUnion[];
    } |
    {
        name: '199';
        children: BigUnion[];
    } |
    {
        name: '200';
        children: BigUnion[];
    } |
    {
        name: '201';
        children: BigUnion[];
    } |
    {
        name: '202';
        children: BigUnion[];
    } |
    {
        name: '203';
        children: BigUnion[];
    } |
    {
        name: '204';
        children: BigUnion[];
    } |
    {
        name: '205';
        children: BigUnion[];
    } |
    {
        name: '206';
        children: BigUnion[];
    } |
    {
        name: '207';
        children: BigUnion[];
    } |
    {
        name: '208';
        children: BigUnion[];
    } |
    {
        name: '209';
        children: BigUnion[];
    } |
    {
        name: '210';
        children: BigUnion[];
    } |
    {
        name: '211';
        children: BigUnion[];
    } |
    {
        name: '212';
        children: BigUnion[];
    } |
    {
        name: '213';
        children: BigUnion[];
    } |
    {
        name: '214';
        children: BigUnion[];
    } |
    {
        name: '215';
        children: BigUnion[];
    } |
    {
        name: '216';
        children: BigUnion[];
    } |
    {
        name: '217';
        children: BigUnion[];
    } |
    {
        name: '218';
        children: BigUnion[];
    } |
    {
        name: '219';
        children: BigUnion[];
    } |
    {
        name: '220';
        children: BigUnion[];
    } |
    {
        name: '221';
        children: BigUnion[];
    } |
    {
        name: '222';
        children: BigUnion[];
    } |
    {
        name: '223';
        children: BigUnion[];
    } |
    {
        name: '224';
        children: BigUnion[];
    } |
    {
        name: '225';
        children: BigUnion[];
    } |
    {
        name: '226';
        children: BigUnion[];
    } |
    {
        name: '227';
        children: BigUnion[];
    } |
    {
        name: '228';
        children: BigUnion[];
    } |
    {
        name: '229';
        children: BigUnion[];
    } |
    {
        name: '230';
        children: BigUnion[];
    } |
    {
        name: '231';
        children: BigUnion[];
    } |
    {
        name: '232';
        children: BigUnion[];
    } |
    {
        name: '233';
        children: BigUnion[];
    } |
    {
        name: '234';
        children: BigUnion[];
    } |
    {
        name: '235';
        children: BigUnion[];
    } |
    {
        name: '236';
        children: BigUnion[];
    } |
    {
        name: '237';
        children: BigUnion[];
    } |
    {
        name: '238';
        children: BigUnion[];
    } |
    {
        name: '239';
        children: BigUnion[];
    } |
    {
        name: '240';
        children: BigUnion[];
    } |
    {
        name: '241';
        children: BigUnion[];
    } |
    {
        name: '242';
        children: BigUnion[];
    } |
    {
        name: '243';
        children: BigUnion[];
    } |
    {
        name: '244';
        children: BigUnion[];
    } |
    {
        name: '245';
        children: BigUnion[];
    } |
    {
        name: '246';
        children: BigUnion[];
    } |
    {
        name: '247';
        children: BigUnion[];
    } |
    {
        name: '248';
        children: BigUnion[];
    } |
    {
        name: '249';
        children: BigUnion[];
    } |
    {
        name: '250';
        children: BigUnion[];
    } |
    {
        name: '251';
        children: BigUnion[];
    } |
    {
        name: '252';
        children: BigUnion[];
    } |
    {
        name: '253';
        children: BigUnion[];
    } |
    {
        name: '254';
        children: BigUnion[];
    } |
    {
        name: '255';
        children: BigUnion[];
    } |
    {
        name: '256';
        children: BigUnion[];
    } |
    {
        name: '257';
        children: BigUnion[];
    } |
    {
        name: '258';
        children: BigUnion[];
    } |
    {
        name: '259';
        children: BigUnion[];
    } |
    {
        name: '260';
        children: BigUnion[];
    } |
    {
        name: '261';
        children: BigUnion[];
    } |
    {
        name: '262';
        children: BigUnion[];
    } |
    {
        name: '263';
        children: BigUnion[];
    } |
    {
        name: '264';
        children: BigUnion[];
    } |
    {
        name: '265';
        children: BigUnion[];
    } |
    {
        name: '266';
        children: BigUnion[];
    } |
    {
        name: '267';
        children: BigUnion[];
    } |
    {
        name: '268';
        children: BigUnion[];
    } |
    {
        name: '269';
        children: BigUnion[];
    } |
    {
        name: '270';
        children: BigUnion[];
    } |
    {
        name: '271';
        children: BigUnion[];
    } |
    {
        name: '272';
        children: BigUnion[];
    } |
    {
        name: '273';
        children: BigUnion[];
    } |
    {
        name: '274';
        children: BigUnion[];
    } |
    {
        name: '275';
        children: BigUnion[];
    } |
    {
        name: '276';
        children: BigUnion[];
    } |
    {
        name: '277';
        children: BigUnion[];
    } |
    {
        name: '278';
        children: BigUnion[];
    } |
    {
        name: '279';
        children: BigUnion[];
    } |
    {
        name: '280';
        children: BigUnion[];
    } |
    {
        name: '281';
        children: BigUnion[];
    } |
    {
        name: '282';
        children: BigUnion[];
    } |
    {
        name: '283';
        children: BigUnion[];
    } |
    {
        name: '284';
        children: BigUnion[];
    } |
    {
        name: '285';
        children: BigUnion[];
    } |
    {
        name: '286';
        children: BigUnion[];
    } |
    {
        name: '287';
        children: BigUnion[];
    } |
    {
        name: '288';
        children: BigUnion[];
    } |
    {
        name: '289';
        children: BigUnion[];
    } |
    {
        name: '290';
        children: BigUnion[];
    } |
    {
        name: '291';
        children: BigUnion[];
    } |
    {
        name: '292';
        children: BigUnion[];
    } |
    {
        name: '293';
        children: BigUnion[];
    } |
    {
        name: '294';
        children: BigUnion[];
    } |
    {
        name: '295';
        children: BigUnion[];
    } |
    {
        name: '296';
        children: BigUnion[];
    } |
    {
        name: '297';
        children: BigUnion[];
    } |
    {
        name: '298';
        children: BigUnion[];
    } |
    {
        name: '299';
        children: BigUnion[];
    } |
    {
        name: '300';
        children: BigUnion[];
    } |
    {
        name: '301';
        children: BigUnion[];
    } |
    {
        name: '302';
        children: BigUnion[];
    } |
    {
        name: '303';
        children: BigUnion[];
    } |
    {
        name: '304';
        children: BigUnion[];
    } |
    {
        name: '305';
        children: BigUnion[];
    } |
    {
        name: '306';
        children: BigUnion[];
    } |
    {
        name: '307';
        children: BigUnion[];
    } |
    {
        name: '308';
        children: BigUnion[];
    } |
    {
        name: '309';
        children: BigUnion[];
    } |
    {
        name: '310';
        children: BigUnion[];
    } |
    {
        name: '311';
        children: BigUnion[];
    } |
    {
        name: '312';
        children: BigUnion[];
    } |
    {
        name: '313';
        children: BigUnion[];
    } |
    {
        name: '314';
        children: BigUnion[];
    } |
    {
        name: '315';
        children: BigUnion[];
    } |
    {
        name: '316';
        children: BigUnion[];
    } |
    {
        name: '317';
        children: BigUnion[];
    } |
    {
        name: '318';
        children: BigUnion[];
    } |
    {
        name: '319';
        children: BigUnion[];
    } |
    {
        name: '320';
        children: BigUnion[];
    } |
    {
        name: '321';
        children: BigUnion[];
    } |
    {
        name: '322';
        children: BigUnion[];
    } |
    {
        name: '323';
        children: BigUnion[];
    } |
    {
        name: '324';
        children: BigUnion[];
    } |
    {
        name: '325';
        children: BigUnion[];
    } |
    {
        name: '326';
        children: BigUnion[];
    } |
    {
        name: '327';
        children: BigUnion[];
    } |
    {
        name: '328';
        children: BigUnion[];
    } |
    {
        name: '329';
        children: BigUnion[];
    } |
    {
        name: '330';
        children: BigUnion[];
    } |
    {
        name: '331';
        children: BigUnion[];
    } |
    {
        name: '332';
        children: BigUnion[];
    } |
    {
        name: '333';
        children: BigUnion[];
    } |
    {
        name: '334';
        children: BigUnion[];
    } |
    {
        name: '335';
        children: BigUnion[];
    } |
    {
        name: '336';
        children: BigUnion[];
    } |
    {
        name: '337';
        children: BigUnion[];
    } |
    {
        name: '338';
        children: BigUnion[];
    } |
    {
        name: '339';
        children: BigUnion[];
    } |
    {
        name: '340';
        children: BigUnion[];
    } |
    {
        name: '341';
        children: BigUnion[];
    } |
    {
        name: '342';
        children: BigUnion[];
    } |
    {
        name: '343';
        children: BigUnion[];
    } |
    {
        name: '344';
        children: BigUnion[];
    } |
    {
        name: '345';
        children: BigUnion[];
    } |
    {
        name: '346';
        children: BigUnion[];
    } |
    {
        name: '347';
        children: BigUnion[];
    } |
    {
        name: '348';
        children: BigUnion[];
    } |
    {
        name: '349';
        children: BigUnion[];
    } |
    {
        name: '350';
        children: BigUnion[];
    } |
    {
        name: '351';
        children: BigUnion[];
    } |
    {
        name: '352';
        children: BigUnion[];
    } |
    {
        name: '353';
        children: BigUnion[];
    } |
    {
        name: '354';
        children: BigUnion[];
    } |
    {
        name: '355';
        children: BigUnion[];
    } |
    {
        name: '356';
        children: BigUnion[];
    } |
    {
        name: '357';
        children: BigUnion[];
    } |
    {
        name: '358';
        children: BigUnion[];
    } |
    {
        name: '359';
        children: BigUnion[];
    } |
    {
        name: '360';
        children: BigUnion[];
    } |
    {
        name: '361';
        children: BigUnion[];
    } |
    {
        name: '362';
        children: BigUnion[];
    } |
    {
        name: '363';
        children: BigUnion[];
    } |
    {
        name: '364';
        children: BigUnion[];
    } |
    {
        name: '365';
        children: BigUnion[];
    } |
    {
        name: '366';
        children: BigUnion[];
    } |
    {
        name: '367';
        children: BigUnion[];
    } |
    {
        name: '368';
        children: BigUnion[];
    } |
    {
        name: '369';
        children: BigUnion[];
    } |
    {
        name: '370';
        children: BigUnion[];
    } |
    {
        name: '371';
        children: BigUnion[];
    } |
    {
        name: '372';
        children: BigUnion[];
    } |
    {
        name: '373';
        children: BigUnion[];
    } |
    {
        name: '374';
        children: BigUnion[];
    } |
    {
        name: '375';
        children: BigUnion[];
    } |
    {
        name: '376';
        children: BigUnion[];
    } |
    {
        name: '377';
        children: BigUnion[];
    } |
    {
        name: '378';
        children: BigUnion[];
    } |
    {
        name: '379';
        children: BigUnion[];
    } |
    {
        name: '380';
        children: BigUnion[];
    } |
    {
        name: '381';
        children: BigUnion[];
    } |
    {
        name: '382';
        children: BigUnion[];
    } |
    {
        name: '383';
        children: BigUnion[];
    } |
    {
        name: '384';
        children: BigUnion[];
    } |
    {
        name: '385';
        children: BigUnion[];
    } |
    {
        name: '386';
        children: BigUnion[];
    } |
    {
        name: '387';
        children: BigUnion[];
    } |
    {
        name: '388';
        children: BigUnion[];
    } |
    {
        name: '389';
        children: BigUnion[];
    } |
    {
        name: '390';
        children: BigUnion[];
    } |
    {
        name: '391';
        children: BigUnion[];
    } |
    {
        name: '392';
        children: BigUnion[];
    } |
    {
        name: '393';
        children: BigUnion[];
    } |
    {
        name: '394';
        children: BigUnion[];
    } |
    {
        name: '395';
        children: BigUnion[];
    } |
    {
        name: '396';
        children: BigUnion[];
    } |
    {
        name: '397';
        children: BigUnion[];
    } |
    {
        name: '398';
        children: BigUnion[];
    } |
    {
        name: '399';
        children: BigUnion[];
    } |
    {
        name: '400';
        children: BigUnion[];
    } |
    {
        name: '401';
        children: BigUnion[];
    } |
    {
        name: '402';
        children: BigUnion[];
    } |
    {
        name: '403';
        children: BigUnion[];
    } |
    {
        name: '404';
        children: BigUnion[];
    } |
    {
        name: '405';
        children: BigUnion[];
    } |
    {
        name: '406';
        children: BigUnion[];
    } |
    {
        name: '407';
        children: BigUnion[];
    } |
    {
        name: '408';
        children: BigUnion[];
    } |
    {
        name: '409';
        children: BigUnion[];
    } |
    {
        name: '410';
        children: BigUnion[];
    } |
    {
        name: '411';
        children: BigUnion[];
    } |
    {
        name: '412';
        children: BigUnion[];
    } |
    {
        name: '413';
        children: BigUnion[];
    } |
    {
        name: '414';
        children: BigUnion[];
    } |
    {
        name: '415';
        children: BigUnion[];
    } |
    {
        name: '416';
        children: BigUnion[];
    } |
    {
        name: '417';
        children: BigUnion[];
    } |
    {
        name: '418';
        children: BigUnion[];
    } |
    {
        name: '419';
        children: BigUnion[];
    } |
    {
        name: '420';
        children: BigUnion[];
    } |
    {
        name: '421';
        children: BigUnion[];
    } |
    {
        name: '422';
        children: BigUnion[];
    } |
    {
        name: '423';
        children: BigUnion[];
    } |
    {
        name: '424';
        children: BigUnion[];
    } |
    {
        name: '425';
        children: BigUnion[];
    } |
    {
        name: '426';
        children: BigUnion[];
    } |
    {
        name: '427';
        children: BigUnion[];
    } |
    {
        name: '428';
        children: BigUnion[];
    } |
    {
        name: '429';
        children: BigUnion[];
    } |
    {
        name: '430';
        children: BigUnion[];
    } |
    {
        name: '431';
        children: BigUnion[];
    } |
    {
        name: '432';
        children: BigUnion[];
    } |
    {
        name: '433';
        children: BigUnion[];
    } |
    {
        name: '434';
        children: BigUnion[];
    } |
    {
        name: '435';
        children: BigUnion[];
    } |
    {
        name: '436';
        children: BigUnion[];
    } |
    {
        name: '437';
        children: BigUnion[];
    } |
    {
        name: '438';
        children: BigUnion[];
    } |
    {
        name: '439';
        children: BigUnion[];
    } |
    {
        name: '440';
        children: BigUnion[];
    } |
    {
        name: '441';
        children: BigUnion[];
    } |
    {
        name: '442';
        children: BigUnion[];
    } |
    {
        name: '443';
        children: BigUnion[];
    } |
    {
        name: '444';
        children: BigUnion[];
    } |
    {
        name: '445';
        children: BigUnion[];
    } |
    {
        name: '446';
        children: BigUnion[];
    } |
    {
        name: '447';
        children: BigUnion[];
    } |
    {
        name: '448';
        children: BigUnion[];
    } |
    {
        name: '449';
        children: BigUnion[];
    } |
    {
        name: '450';
        children: BigUnion[];
    } |
    {
        name: '451';
        children: BigUnion[];
    } |
    {
        name: '452';
        children: BigUnion[];
    } |
    {
        name: '453';
        children: BigUnion[];
    } |
    {
        name: '454';
        children: BigUnion[];
    } |
    {
        name: '455';
        children: BigUnion[];
    } |
    {
        name: '456';
        children: BigUnion[];
    } |
    {
        name: '457';
        children: BigUnion[];
    } |
    {
        name: '458';
        children: BigUnion[];
    } |
    {
        name: '459';
        children: BigUnion[];
    } |
    {
        name: '460';
        children: BigUnion[];
    } |
    {
        name: '461';
        children: BigUnion[];
    } |
    {
        name: '462';
        children: BigUnion[];
    } |
    {
        name: '463';
        children: BigUnion[];
    } |
    {
        name: '464';
        children: BigUnion[];
    } |
    {
        name: '465';
        children: BigUnion[];
    } |
    {
        name: '466';
        children: BigUnion[];
    } |
    {
        name: '467';
        children: BigUnion[];
    } |
    {
        name: '468';
        children: BigUnion[];
    } |
    {
        name: '469';
        children: BigUnion[];
    } |
    {
        name: '470';
        children: BigUnion[];
    } |
    {
        name: '471';
        children: BigUnion[];
    } |
    {
        name: '472';
        children: BigUnion[];
    } |
    {
        name: '473';
        children: BigUnion[];
    } |
    {
        name: '474';
        children: BigUnion[];
    } |
    {
        name: '475';
        children: BigUnion[];
    } |
    {
        name: '476';
        children: BigUnion[];
    } |
    {
        name: '477';
        children: BigUnion[];
    } |
    {
        name: '478';
        children: BigUnion[];
    } |
    {
        name: '479';
        children: BigUnion[];
    } |
    {
        name: '480';
        children: BigUnion[];
    } |
    {
        name: '481';
        children: BigUnion[];
    } |
    {
        name: '482';
        children: BigUnion[];
    } |
    {
        name: '483';
        children: BigUnion[];
    } |
    {
        name: '484';
        children: BigUnion[];
    } |
    {
        name: '485';
        children: BigUnion[];
    } |
    {
        name: '486';
        children: BigUnion[];
    } |
    {
        name: '487';
        children: BigUnion[];
    } |
    {
        name: '488';
        children: BigUnion[];
    } |
    {
        name: '489';
        children: BigUnion[];
    } |
    {
        name: '490';
        children: BigUnion[];
    } |
    {
        name: '491';
        children: BigUnion[];
    } |
    {
        name: '492';
        children: BigUnion[];
    } |
    {
        name: '493';
        children: BigUnion[];
    } |
    {
        name: '494';
        children: BigUnion[];
    } |
    {
        name: '495';
        children: BigUnion[];
    } |
    {
        name: '496';
        children: BigUnion[];
    } |
    {
        name: '497';
        children: BigUnion[];
    } |
    {
        name: '498';
        children: BigUnion[];
    } |
    {
        name: '499';
        children: BigUnion[];
    } |
    {
        name: '500';
        children: BigUnion[];
    } |
    {
        name: '501';
        children: BigUnion[];
    } |
    {
        name: '502';
        children: BigUnion[];
    } |
    {
        name: '503';
        children: BigUnion[];
    } |
    {
        name: '504';
        children: BigUnion[];
    } |
    {
        name: '505';
        children: BigUnion[];
    } |
    {
        name: '506';
        children: BigUnion[];
    } |
    {
        name: '507';
        children: BigUnion[];
    } |
    {
        name: '508';
        children: BigUnion[];
    } |
    {
        name: '509';
        children: BigUnion[];
    } |
    {
        name: '510';
        children: BigUnion[];
    } |
    {
        name: '511';
        children: BigUnion[];
    } |
    {
        name: '512';
        children: BigUnion[];
    } |
    {
        name: '513';
        children: BigUnion[];
    } |
    {
        name: '514';
        children: BigUnion[];
    } |
    {
        name: '515';
        children: BigUnion[];
    } |
    {
        name: '516';
        children: BigUnion[];
    } |
    {
        name: '517';
        children: BigUnion[];
    } |
    {
        name: '518';
        children: BigUnion[];
    } |
    {
        name: '519';
        children: BigUnion[];
    } |
    {
        name: '520';
        children: BigUnion[];
    } |
    {
        name: '521';
        children: BigUnion[];
    } |
    {
        name: '522';
        children: BigUnion[];
    } |
    {
        name: '523';
        children: BigUnion[];
    } |
    {
        name: '524';
        children: BigUnion[];
    } |
    {
        name: '525';
        children: BigUnion[];
    } |
    {
        name: '526';
        children: BigUnion[];
    } |
    {
        name: '527';
        children: BigUnion[];
    } |
    {
        name: '528';
        children: BigUnion[];
    } |
    {
        name: '529';
        children: BigUnion[];
    } |
    {
        name: '530';
        children: BigUnion[];
    } |
    {
        name: '531';
        children: BigUnion[];
    } |
    {
        name: '532';
        children: BigUnion[];
    } |
    {
        name: '533';
        children: BigUnion[];
    } |
    {
        name: '534';
        children: BigUnion[];
    } |
    {
        name: '535';
        children: BigUnion[];
    } |
    {
        name: '536';
        children: BigUnion[];
    } |
    {
        name: '537';
        children: BigUnion[];
    } |
    {
        name: '538';
        children: BigUnion[];
    } |
    {
        name: '539';
        children: BigUnion[];
    } |
    {
        name: '540';
        children: BigUnion[];
    } |
    {
        name: '541';
        children: BigUnion[];
    } |
    {
        name: '542';
        children: BigUnion[];
    } |
    {
        name: '543';
        children: BigUnion[];
    } |
    {
        name: '544';
        children: BigUnion[];
    } |
    {
        name: '545';
        children: BigUnion[];
    } |
    {
        name: '546';
        children: BigUnion[];
    } |
    {
        name: '547';
        children: BigUnion[];
    } |
    {
        name: '548';
        children: BigUnion[];
    } |
    {
        name: '549';
        children: BigUnion[];
    } |
    {
        name: '550';
        children: BigUnion[];
    } |
    {
        name: '551';
        children: BigUnion[];
    } |
    {
        name: '552';
        children: BigUnion[];
    } |
    {
        name: '553';
        children: BigUnion[];
    } |
    {
        name: '554';
        children: BigUnion[];
    } |
    {
        name: '555';
        children: BigUnion[];
    } |
    {
        name: '556';
        children: BigUnion[];
    } |
    {
        name: '557';
        children: BigUnion[];
    } |
    {
        name: '558';
        children: BigUnion[];
    } |
    {
        name: '559';
        children: BigUnion[];
    } |
    {
        name: '560';
        children: BigUnion[];
    } |
    {
        name: '561';
        children: BigUnion[];
    } |
    {
        name: '562';
        children: BigUnion[];
    } |
    {
        name: '563';
        children: BigUnion[];
    } |
    {
        name: '564';
        children: BigUnion[];
    } |
    {
        name: '565';
        children: BigUnion[];
    } |
    {
        name: '566';
        children: BigUnion[];
    } |
    {
        name: '567';
        children: BigUnion[];
    } |
    {
        name: '568';
        children: BigUnion[];
    } |
    {
        name: '569';
        children: BigUnion[];
    } |
    {
        name: '570';
        children: BigUnion[];
    } |
    {
        name: '571';
        children: BigUnion[];
    } |
    {
        name: '572';
        children: BigUnion[];
    } |
    {
        name: '573';
        children: BigUnion[];
    } |
    {
        name: '574';
        children: BigUnion[];
    } |
    {
        name: '575';
        children: BigUnion[];
    } |
    {
        name: '576';
        children: BigUnion[];
    } |
    {
        name: '577';
        children: BigUnion[];
    } |
    {
        name: '578';
        children: BigUnion[];
    } |
    {
        name: '579';
        children: BigUnion[];
    } |
    {
        name: '580';
        children: BigUnion[];
    } |
    {
        name: '581';
        children: BigUnion[];
    } |
    {
        name: '582';
        children: BigUnion[];
    } |
    {
        name: '583';
        children: BigUnion[];
    } |
    {
        name: '584';
        children: BigUnion[];
    } |
    {
        name: '585';
        children: BigUnion[];
    } |
    {
        name: '586';
        children: BigUnion[];
    } |
    {
        name: '587';
        children: BigUnion[];
    } |
    {
        name: '588';
        children: BigUnion[];
    } |
    {
        name: '589';
        children: BigUnion[];
    } |
    {
        name: '590';
        children: BigUnion[];
    } |
    {
        name: '591';
        children: BigUnion[];
    } |
    {
        name: '592';
        children: BigUnion[];
    } |
    {
        name: '593';
        children: BigUnion[];
    } |
    {
        name: '594';
        children: BigUnion[];
    } |
    {
        name: '595';
        children: BigUnion[];
    } |
    {
        name: '596';
        children: BigUnion[];
    } |
    {
        name: '597';
        children: BigUnion[];
    } |
    {
        name: '598';
        children: BigUnion[];
    } |
    {
        name: '599';
        children: BigUnion[];
    } |
    {
        name: '600';
        children: BigUnion[];
    } |
    {
        name: '601';
        children: BigUnion[];
    } |
    {
        name: '602';
        children: BigUnion[];
    } |
    {
        name: '603';
        children: BigUnion[];
    } |
    {
        name: '604';
        children: BigUnion[];
    } |
    {
        name: '605';
        children: BigUnion[];
    } |
    {
        name: '606';
        children: BigUnion[];
    } |
    {
        name: '607';
        children: BigUnion[];
    } |
    {
        name: '608';
        children: BigUnion[];
    } |
    {
        name: '609';
        children: BigUnion[];
    } |
    {
        name: '610';
        children: BigUnion[];
    } |
    {
        name: '611';
        children: BigUnion[];
    } |
    {
        name: '612';
        children: BigUnion[];
    } |
    {
        name: '613';
        children: BigUnion[];
    } |
    {
        name: '614';
        children: BigUnion[];
    } |
    {
        name: '615';
        children: BigUnion[];
    } |
    {
        name: '616';
        children: BigUnion[];
    } |
    {
        name: '617';
        children: BigUnion[];
    } |
    {
        name: '618';
        children: BigUnion[];
    } |
    {
        name: '619';
        children: BigUnion[];
    } |
    {
        name: '620';
        children: BigUnion[];
    } |
    {
        name: '621';
        children: BigUnion[];
    } |
    {
        name: '622';
        children: BigUnion[];
    } |
    {
        name: '623';
        children: BigUnion[];
    } |
    {
        name: '624';
        children: BigUnion[];
    } |
    {
        name: '625';
        children: BigUnion[];
    } |
    {
        name: '626';
        children: BigUnion[];
    } |
    {
        name: '627';
        children: BigUnion[];
    } |
    {
        name: '628';
        children: BigUnion[];
    } |
    {
        name: '629';
        children: BigUnion[];
    } |
    {
        name: '630';
        children: BigUnion[];
    } |
    {
        name: '631';
        children: BigUnion[];
    } |
    {
        name: '632';
        children: BigUnion[];
    } |
    {
        name: '633';
        children: BigUnion[];
    } |
    {
        name: '634';
        children: BigUnion[];
    } |
    {
        name: '635';
        children: BigUnion[];
    } |
    {
        name: '636';
        children: BigUnion[];
    } |
    {
        name: '637';
        children: BigUnion[];
    } |
    {
        name: '638';
        children: BigUnion[];
    } |
    {
        name: '639';
        children: BigUnion[];
    } |
    {
        name: '640';
        children: BigUnion[];
    } |
    {
        name: '641';
        children: BigUnion[];
    } |
    {
        name: '642';
        children: BigUnion[];
    } |
    {
        name: '643';
        children: BigUnion[];
    } |
    {
        name: '644';
        children: BigUnion[];
    } |
    {
        name: '645';
        children: BigUnion[];
    } |
    {
        name: '646';
        children: BigUnion[];
    } |
    {
        name: '647';
        children: BigUnion[];
    } |
    {
        name: '648';
        children: BigUnion[];
    } |
    {
        name: '649';
        children: BigUnion[];
    } |
    {
        name: '650';
        children: BigUnion[];
    } |
    {
        name: '651';
        children: BigUnion[];
    } |
    {
        name: '652';
        children: BigUnion[];
    } |
    {
        name: '653';
        children: BigUnion[];
    } |
    {
        name: '654';
        children: BigUnion[];
    } |
    {
        name: '655';
        children: BigUnion[];
    } |
    {
        name: '656';
        children: BigUnion[];
    } |
    {
        name: '657';
        children: BigUnion[];
    } |
    {
        name: '658';
        children: BigUnion[];
    } |
    {
        name: '659';
        children: BigUnion[];
    } |
    {
        name: '660';
        children: BigUnion[];
    } |
    {
        name: '661';
        children: BigUnion[];
    } |
    {
        name: '662';
        children: BigUnion[];
    } |
    {
        name: '663';
        children: BigUnion[];
    } |
    {
        name: '664';
        children: BigUnion[];
    } |
    {
        name: '665';
        children: BigUnion[];
    } |
    {
        name: '666';
        children: BigUnion[];
    } |
    {
        name: '667';
        children: BigUnion[];
    } |
    {
        name: '668';
        children: BigUnion[];
    } |
    {
        name: '669';
        children: BigUnion[];
    } |
    {
        name: '670';
        children: BigUnion[];
    } |
    {
        name: '671';
        children: BigUnion[];
    } |
    {
        name: '672';
        children: BigUnion[];
    } |
    {
        name: '673';
        children: BigUnion[];
    } |
    {
        name: '674';
        children: BigUnion[];
    } |
    {
        name: '675';
        children: BigUnion[];
    } |
    {
        name: '676';
        children: BigUnion[];
    } |
    {
        name: '677';
        children: BigUnion[];
    } |
    {
        name: '678';
        children: BigUnion[];
    } |
    {
        name: '679';
        children: BigUnion[];
    } |
    {
        name: '680';
        children: BigUnion[];
    } |
    {
        name: '681';
        children: BigUnion[];
    } |
    {
        name: '682';
        children: BigUnion[];
    } |
    {
        name: '683';
        children: BigUnion[];
    } |
    {
        name: '684';
        children: BigUnion[];
    } |
    {
        name: '685';
        children: BigUnion[];
    } |
    {
        name: '686';
        children: BigUnion[];
    } |
    {
        name: '687';
        children: BigUnion[];
    } |
    {
        name: '688';
        children: BigUnion[];
    } |
    {
        name: '689';
        children: BigUnion[];
    } |
    {
        name: '690';
        children: BigUnion[];
    } |
    {
        name: '691';
        children: BigUnion[];
    } |
    {
        name: '692';
        children: BigUnion[];
    } |
    {
        name: '693';
        children: BigUnion[];
    } |
    {
        name: '694';
        children: BigUnion[];
    } |
    {
        name: '695';
        children: BigUnion[];
    } |
    {
        name: '696';
        children: BigUnion[];
    } |
    {
        name: '697';
        children: BigUnion[];
    } |
    {
        name: '698';
        children: BigUnion[];
    } |
    {
        name: '699';
        children: BigUnion[];
    } |
    {
        name: '700';
        children: BigUnion[];
    } |
    {
        name: '701';
        children: BigUnion[];
    } |
    {
        name: '702';
        children: BigUnion[];
    } |
    {
        name: '703';
        children: BigUnion[];
    } |
    {
        name: '704';
        children: BigUnion[];
    } |
    {
        name: '705';
        children: BigUnion[];
    } |
    {
        name: '706';
        children: BigUnion[];
    } |
    {
        name: '707';
        children: BigUnion[];
    } |
    {
        name: '708';
        children: BigUnion[];
    } |
    {
        name: '709';
        children: BigUnion[];
    } |
    {
        name: '710';
        children: BigUnion[];
    } |
    {
        name: '711';
        children: BigUnion[];
    } |
    {
        name: '712';
        children: BigUnion[];
    } |
    {
        name: '713';
        children: BigUnion[];
    } |
    {
        name: '714';
        children: BigUnion[];
    } |
    {
        name: '715';
        children: BigUnion[];
    } |
    {
        name: '716';
        children: BigUnion[];
    } |
    {
        name: '717';
        children: BigUnion[];
    } |
    {
        name: '718';
        children: BigUnion[];
    } |
    {
        name: '719';
        children: BigUnion[];
    } |
    {
        name: '720';
        children: BigUnion[];
    } |
    {
        name: '721';
        children: BigUnion[];
    } |
    {
        name: '722';
        children: BigUnion[];
    } |
    {
        name: '723';
        children: BigUnion[];
    } |
    {
        name: '724';
        children: BigUnion[];
    } |
    {
        name: '725';
        children: BigUnion[];
    } |
    {
        name: '726';
        children: BigUnion[];
    } |
    {
        name: '727';
        children: BigUnion[];
    } |
    {
        name: '728';
        children: BigUnion[];
    } |
    {
        name: '729';
        children: BigUnion[];
    } |
    {
        name: '730';
        children: BigUnion[];
    } |
    {
        name: '731';
        children: BigUnion[];
    } |
    {
        name: '732';
        children: BigUnion[];
    } |
    {
        name: '733';
        children: BigUnion[];
    } |
    {
        name: '734';
        children: BigUnion[];
    } |
    {
        name: '735';
        children: BigUnion[];
    } |
    {
        name: '736';
        children: BigUnion[];
    } |
    {
        name: '737';
        children: BigUnion[];
    } |
    {
        name: '738';
        children: BigUnion[];
    } |
    {
        name: '739';
        children: BigUnion[];
    } |
    {
        name: '740';
        children: BigUnion[];
    } |
    {
        name: '741';
        children: BigUnion[];
    } |
    {
        name: '742';
        children: BigUnion[];
    } |
    {
        name: '743';
        children: BigUnion[];
    } |
    {
        name: '744';
        children: BigUnion[];
    } |
    {
        name: '745';
        children: BigUnion[];
    } |
    {
        name: '746';
        children: BigUnion[];
    } |
    {
        name: '747';
        children: BigUnion[];
    } |
    {
        name: '748';
        children: BigUnion[];
    } |
    {
        name: '749';
        children: BigUnion[];
    } |
    {
        name: '750';
        children: BigUnion[];
    } |
    {
        name: '751';
        children: BigUnion[];
    } |
    {
        name: '752';
        children: BigUnion[];
    } |
    {
        name: '753';
        children: BigUnion[];
    } |
    {
        name: '754';
        children: BigUnion[];
    } |
    {
        name: '755';
        children: BigUnion[];
    } |
    {
        name: '756';
        children: BigUnion[];
    } |
    {
        name: '757';
        children: BigUnion[];
    } |
    {
        name: '758';
        children: BigUnion[];
    } |
    {
        name: '759';
        children: BigUnion[];
    } |
    {
        name: '760';
        children: BigUnion[];
    } |
    {
        name: '761';
        children: BigUnion[];
    } |
    {
        name: '762';
        children: BigUnion[];
    } |
    {
        name: '763';
        children: BigUnion[];
    } |
    {
        name: '764';
        children: BigUnion[];
    } |
    {
        name: '765';
        children: BigUnion[];
    } |
    {
        name: '766';
        children: BigUnion[];
    } |
    {
        name: '767';
        children: BigUnion[];
    } |
    {
        name: '768';
        children: BigUnion[];
    } |
    {
        name: '769';
        children: BigUnion[];
    } |
    {
        name: '770';
        children: BigUnion[];
    } |
    {
        name: '771';
        children: BigUnion[];
    } |
    {
        name: '772';
        children: BigUnion[];
    } |
    {
        name: '773';
        children: BigUnion[];
    } |
    {
        name: '774';
        children: BigUnion[];
    } |
    {
        name: '775';
        children: BigUnion[];
    } |
    {
        name: '776';
        children: BigUnion[];
    } |
    {
        name: '777';
        children: BigUnion[];
    } |
    {
        name: '778';
        children: BigUnion[];
    } |
    {
        name: '779';
        children: BigUnion[];
    } |
    {
        name: '780';
        children: BigUnion[];
    } |
    {
        name: '781';
        children: BigUnion[];
    } |
    {
        name: '782';
        children: BigUnion[];
    } |
    {
        name: '783';
        children: BigUnion[];
    } |
    {
        name: '784';
        children: BigUnion[];
    } |
    {
        name: '785';
        children: BigUnion[];
    } |
    {
        name: '786';
        children: BigUnion[];
    } |
    {
        name: '787';
        children: BigUnion[];
    } |
    {
        name: '788';
        children: BigUnion[];
    } |
    {
        name: '789';
        children: BigUnion[];
    } |
    {
        name: '790';
        children: BigUnion[];
    } |
    {
        name: '791';
        children: BigUnion[];
    } |
    {
        name: '792';
        children: BigUnion[];
    } |
    {
        name: '793';
        children: BigUnion[];
    } |
    {
        name: '794';
        children: BigUnion[];
    } |
    {
        name: '795';
        children: BigUnion[];
    } |
    {
        name: '796';
        children: BigUnion[];
    } |
    {
        name: '797';
        children: BigUnion[];
    } |
    {
        name: '798';
        children: BigUnion[];
    } |
    {
        name: '799';
        children: BigUnion[];
    } |
    {
        name: '800';
        children: BigUnion[];
    } |
    {
        name: '801';
        children: BigUnion[];
    } |
    {
        name: '802';
        children: BigUnion[];
    } |
    {
        name: '803';
        children: BigUnion[];
    } |
    {
        name: '804';
        children: BigUnion[];
    } |
    {
        name: '805';
        children: BigUnion[];
    } |
    {
        name: '806';
        children: BigUnion[];
    } |
    {
        name: '807';
        children: BigUnion[];
    } |
    {
        name: '808';
        children: BigUnion[];
    } |
    {
        name: '809';
        children: BigUnion[];
    } |
    {
        name: '810';
        children: BigUnion[];
    } |
    {
        name: '811';
        children: BigUnion[];
    } |
    {
        name: '812';
        children: BigUnion[];
    } |
    {
        name: '813';
        children: BigUnion[];
    } |
    {
        name: '814';
        children: BigUnion[];
    } |
    {
        name: '815';
        children: BigUnion[];
    } |
    {
        name: '816';
        children: BigUnion[];
    } |
    {
        name: '817';
        children: BigUnion[];
    } |
    {
        name: '818';
        children: BigUnion[];
    } |
    {
        name: '819';
        children: BigUnion[];
    } |
    {
        name: '820';
        children: BigUnion[];
    } |
    {
        name: '821';
        children: BigUnion[];
    } |
    {
        name: '822';
        children: BigUnion[];
    } |
    {
        name: '823';
        children: BigUnion[];
    } |
    {
        name: '824';
        children: BigUnion[];
    } |
    {
        name: '825';
        children: BigUnion[];
    } |
    {
        name: '826';
        children: BigUnion[];
    } |
    {
        name: '827';
        children: BigUnion[];
    } |
    {
        name: '828';
        children: BigUnion[];
    } |
    {
        name: '829';
        children: BigUnion[];
    } |
    {
        name: '830';
        children: BigUnion[];
    } |
    {
        name: '831';
        children: BigUnion[];
    } |
    {
        name: '832';
        children: BigUnion[];
    } |
    {
        name: '833';
        children: BigUnion[];
    } |
    {
        name: '834';
        children: BigUnion[];
    } |
    {
        name: '835';
        children: BigUnion[];
    } |
    {
        name: '836';
        children: BigUnion[];
    } |
    {
        name: '837';
        children: BigUnion[];
    } |
    {
        name: '838';
        children: BigUnion[];
    } |
    {
        name: '839';
        children: BigUnion[];
    } |
    {
        name: '840';
        children: BigUnion[];
    } |
    {
        name: '841';
        children: BigUnion[];
    } |
    {
        name: '842';
        children: BigUnion[];
    } |
    {
        name: '843';
        children: BigUnion[];
    } |
    {
        name: '844';
        children: BigUnion[];
    } |
    {
        name: '845';
        children: BigUnion[];
    } |
    {
        name: '846';
        children: BigUnion[];
    } |
    {
        name: '847';
        children: BigUnion[];
    } |
    {
        name: '848';
        children: BigUnion[];
    } |
    {
        name: '849';
        children: BigUnion[];
    } |
    {
        name: '850';
        children: BigUnion[];
    } |
    {
        name: '851';
        children: BigUnion[];
    } |
    {
        name: '852';
        children: BigUnion[];
    } |
    {
        name: '853';
        children: BigUnion[];
    } |
    {
        name: '854';
        children: BigUnion[];
    } |
    {
        name: '855';
        children: BigUnion[];
    } |
    {
        name: '856';
        children: BigUnion[];
    } |
    {
        name: '857';
        children: BigUnion[];
    } |
    {
        name: '858';
        children: BigUnion[];
    } |
    {
        name: '859';
        children: BigUnion[];
    } |
    {
        name: '860';
        children: BigUnion[];
    } |
    {
        name: '861';
        children: BigUnion[];
    } |
    {
        name: '862';
        children: BigUnion[];
    } |
    {
        name: '863';
        children: BigUnion[];
    } |
    {
        name: '864';
        children: BigUnion[];
    } |
    {
        name: '865';
        children: BigUnion[];
    } |
    {
        name: '866';
        children: BigUnion[];
    } |
    {
        name: '867';
        children: BigUnion[];
    } |
    {
        name: '868';
        children: BigUnion[];
    } |
    {
        name: '869';
        children: BigUnion[];
    } |
    {
        name: '870';
        children: BigUnion[];
    } |
    {
        name: '871';
        children: BigUnion[];
    } |
    {
        name: '872';
        children: BigUnion[];
    } |
    {
        name: '873';
        children: BigUnion[];
    } |
    {
        name: '874';
        children: BigUnion[];
    } |
    {
        name: '875';
        children: BigUnion[];
    } |
    {
        name: '876';
        children: BigUnion[];
    } |
    {
        name: '877';
        children: BigUnion[];
    } |
    {
        name: '878';
        children: BigUnion[];
    } |
    {
        name: '879';
        children: BigUnion[];
    } |
    {
        name: '880';
        children: BigUnion[];
    } |
    {
        name: '881';
        children: BigUnion[];
    } |
    {
        name: '882';
        children: BigUnion[];
    } |
    {
        name: '883';
        children: BigUnion[];
    } |
    {
        name: '884';
        children: BigUnion[];
    } |
    {
        name: '885';
        children: BigUnion[];
    } |
    {
        name: '886';
        children: BigUnion[];
    } |
    {
        name: '887';
        children: BigUnion[];
    } |
    {
        name: '888';
        children: BigUnion[];
    } |
    {
        name: '889';
        children: BigUnion[];
    } |
    {
        name: '890';
        children: BigUnion[];
    } |
    {
        name: '891';
        children: BigUnion[];
    } |
    {
        name: '892';
        children: BigUnion[];
    } |
    {
        name: '893';
        children: BigUnion[];
    } |
    {
        name: '894';
        children: BigUnion[];
    } |
    {
        name: '895';
        children: BigUnion[];
    } |
    {
        name: '896';
        children: BigUnion[];
    } |
    {
        name: '897';
        children: BigUnion[];
    } |
    {
        name: '898';
        children: BigUnion[];
    } |
    {
        name: '899';
        children: BigUnion[];
    } |
    {
        name: '900';
        children: BigUnion[];
    } |
    {
        name: '901';
        children: BigUnion[];
    } |
    {
        name: '902';
        children: BigUnion[];
    } |
    {
        name: '903';
        children: BigUnion[];
    } |
    {
        name: '904';
        children: BigUnion[];
    } |
    {
        name: '905';
        children: BigUnion[];
    } |
    {
        name: '906';
        children: BigUnion[];
    } |
    {
        name: '907';
        children: BigUnion[];
    } |
    {
        name: '908';
        children: BigUnion[];
    } |
    {
        name: '909';
        children: BigUnion[];
    } |
    {
        name: '910';
        children: BigUnion[];
    } |
    {
        name: '911';
        children: BigUnion[];
    } |
    {
        name: '912';
        children: BigUnion[];
    } |
    {
        name: '913';
        children: BigUnion[];
    } |
    {
        name: '914';
        children: BigUnion[];
    } |
    {
        name: '915';
        children: BigUnion[];
    } |
    {
        name: '916';
        children: BigUnion[];
    } |
    {
        name: '917';
        children: BigUnion[];
    } |
    {
        name: '918';
        children: BigUnion[];
    } |
    {
        name: '919';
        children: BigUnion[];
    } |
    {
        name: '920';
        children: BigUnion[];
    } |
    {
        name: '921';
        children: BigUnion[];
    } |
    {
        name: '922';
        children: BigUnion[];
    } |
    {
        name: '923';
        children: BigUnion[];
    } |
    {
        name: '924';
        children: BigUnion[];
    } |
    {
        name: '925';
        children: BigUnion[];
    } |
    {
        name: '926';
        children: BigUnion[];
    } |
    {
        name: '927';
        children: BigUnion[];
    } |
    {
        name: '928';
        children: BigUnion[];
    } |
    {
        name: '929';
        children: BigUnion[];
    } |
    {
        name: '930';
        children: BigUnion[];
    } |
    {
        name: '931';
        children: BigUnion[];
    } |
    {
        name: '932';
        children: BigUnion[];
    } |
    {
        name: '933';
        children: BigUnion[];
    } |
    {
        name: '934';
        children: BigUnion[];
    } |
    {
        name: '935';
        children: BigUnion[];
    } |
    {
        name: '936';
        children: BigUnion[];
    } |
    {
        name: '937';
        children: BigUnion[];
    } |
    {
        name: '938';
        children: BigUnion[];
    } |
    {
        name: '939';
        children: BigUnion[];
    } |
    {
        name: '940';
        children: BigUnion[];
    } |
    {
        name: '941';
        children: BigUnion[];
    } |
    {
        name: '942';
        children: BigUnion[];
    } |
    {
        name: '943';
        children: BigUnion[];
    } |
    {
        name: '944';
        children: BigUnion[];
    } |
    {
        name: '945';
        children: BigUnion[];
    } |
    {
        name: '946';
        children: BigUnion[];
    } |
    {
        name: '947';
        children: BigUnion[];
    } |
    {
        name: '948';
        children: BigUnion[];
    } |
    {
        name: '949';
        children: BigUnion[];
    } |
    {
        name: '950';
        children: BigUnion[];
    } |
    {
        name: '951';
        children: BigUnion[];
    } |
    {
        name: '952';
        children: BigUnion[];
    } |
    {
        name: '953';
        children: BigUnion[];
    } |
    {
        name: '954';
        children: BigUnion[];
    } |
    {
        name: '955';
        children: BigUnion[];
    } |
    {
        name: '956';
        children: BigUnion[];
    } |
    {
        name: '957';
        children: BigUnion[];
    } |
    {
        name: '958';
        children: BigUnion[];
    } |
    {
        name: '959';
        children: BigUnion[];
    } |
    {
        name: '960';
        children: BigUnion[];
    } |
    {
        name: '961';
        children: BigUnion[];
    } |
    {
        name: '962';
        children: BigUnion[];
    } |
    {
        name: '963';
        children: BigUnion[];
    } |
    {
        name: '964';
        children: BigUnion[];
    } |
    {
        name: '965';
        children: BigUnion[];
    } |
    {
        name: '966';
        children: BigUnion[];
    } |
    {
        name: '967';
        children: BigUnion[];
    } |
    {
        name: '968';
        children: BigUnion[];
    } |
    {
        name: '969';
        children: BigUnion[];
    } |
    {
        name: '970';
        children: BigUnion[];
    } |
    {
        name: '971';
        children: BigUnion[];
    } |
    {
        name: '972';
        children: BigUnion[];
    } |
    {
        name: '973';
        children: BigUnion[];
    } |
    {
        name: '974';
        children: BigUnion[];
    } |
    {
        name: '975';
        children: BigUnion[];
    } |
    {
        name: '976';
        children: BigUnion[];
    } |
    {
        name: '977';
        children: BigUnion[];
    } |
    {
        name: '978';
        children: BigUnion[];
    } |
    {
        name: '979';
        children: BigUnion[];
    } |
    {
        name: '980';
        children: BigUnion[];
    } |
    {
        name: '981';
        children: BigUnion[];
    } |
    {
        name: '982';
        children: BigUnion[];
    } |
    {
        name: '983';
        children: BigUnion[];
    } |
    {
        name: '984';
        children: BigUnion[];
    } |
    {
        name: '985';
        children: BigUnion[];
    } |
    {
        name: '986';
        children: BigUnion[];
    } |
    {
        name: '987';
        children: BigUnion[];
    } |
    {
        name: '988';
        children: BigUnion[];
    } |
    {
        name: '989';
        children: BigUnion[];
    } |
    {
        name: '990';
        children: BigUnion[];
    } |
    {
        name: '991';
        children: BigUnion[];
    } |
    {
        name: '992';
        children: BigUnion[];
    } |
    {
        name: '993';
        children: BigUnion[];
    } |
    {
        name: '994';
        children: BigUnion[];
    } |
    {
        name: '995';
        children: BigUnion[];
    } |
    {
        name: '996';
        children: BigUnion[];
    } |
    {
        name: '997';
        children: BigUnion[];
    } |
    {
        name: '998';
        children: BigUnion[];
    } |
    {
        name: '999';
        children: BigUnion[];
    } |
    {
        name: '1000';
        children: BigUnion[];
    } |
    {
        name: '1001';
        children: BigUnion[];
    } |
    {
        name: '1002';
        children: BigUnion[];
    } |
    {
        name: '1003';
        children: BigUnion[];
    } |
    {
        name: '1004';
        children: BigUnion[];
    } |
    {
        name: '1005';
        children: BigUnion[];
    } |
    {
        name: '1006';
        children: BigUnion[];
    } |
    {
        name: '1007';
        children: BigUnion[];
    } |
    {
        name: '1008';
        children: BigUnion[];
    } |
    {
        name: '1009';
        children: BigUnion[];
    } |
    {
        name: '1010';
        children: BigUnion[];
    } |
    {
        name: '1011';
        children: BigUnion[];
    } |
    {
        name: '1012';
        children: BigUnion[];
    } |
    {
        name: '1013';
        children: BigUnion[];
    } |
    {
        name: '1014';
        children: BigUnion[];
    } |
    {
        name: '1015';
        children: BigUnion[];
    } |
    {
        name: '1016';
        children: BigUnion[];
    } |
    {
        name: '1017';
        children: BigUnion[];
    } |
    {
        name: '1018';
        children: BigUnion[];
    } |
    {
        name: '1019';
        children: BigUnion[];
    } |
    {
        name: '1020';
        children: BigUnion[];
    } |
    {
        name: '1021';
        children: BigUnion[];
    } |
    {
        name: '1022';
        children: BigUnion[];
    } |
    {
        name: '1023';
        children: BigUnion[];
    } |
    {
        name: '1024';
        children: BigUnion[];
    } |
    {
        name: '1025';
        children: BigUnion[];
    } |
    {
        name: '1026';
        children: BigUnion[];
    } |
    {
        name: '1027';
        children: BigUnion[];
    } |
    {
        name: '1028';
        children: BigUnion[];
    } |
    {
        name: '1029';
        children: BigUnion[];
    } |
    {
        name: '1030';
        children: BigUnion[];
    } |
    {
        name: '1031';
        children: BigUnion[];
    } |
    {
        name: '1032';
        children: BigUnion[];
    } |
    {
        name: '1033';
        children: BigUnion[];
    } |
    {
        name: '1034';
        children: BigUnion[];
    } |
    {
        name: '1035';
        children: BigUnion[];
    } |
    {
        name: '1036';
        children: BigUnion[];
    } |
    {
        name: '1037';
        children: BigUnion[];
    } |
    {
        name: '1038';
        children: BigUnion[];
    } |
    {
        name: '1039';
        children: BigUnion[];
    } |
    {
        name: '1040';
        children: BigUnion[];
    } |
    {
        name: '1041';
        children: BigUnion[];
    } |
    {
        name: '1042';
        children: BigUnion[];
    } |
    {
        name: '1043';
        children: BigUnion[];
    } |
    {
        name: '1044';
        children: BigUnion[];
    } |
    {
        name: '1045';
        children: BigUnion[];
    } |
    {
        name: '1046';
        children: BigUnion[];
    } |
    {
        name: '1047';
        children: BigUnion[];
    } |
    {
        name: '1048';
        children: BigUnion[];
    } |
    {
        name: '1049';
        children: BigUnion[];
    } |
    {
        name: '1050';
        children: BigUnion[];
    } |
    {
        name: '1051';
        children: BigUnion[];
    } |
    {
        name: '1052';
        children: BigUnion[];
    } |
    {
        name: '1053';
        children: BigUnion[];
    } |
    {
        name: '1054';
        children: BigUnion[];
    } |
    {
        name: '1055';
        children: BigUnion[];
    } |
    {
        name: '1056';
        children: BigUnion[];
    } |
    {
        name: '1057';
        children: BigUnion[];
    } |
    {
        name: '1058';
        children: BigUnion[];
    } |
    {
        name: '1059';
        children: BigUnion[];
    } |
    {
        name: '1060';
        children: BigUnion[];
    } |
    {
        name: '1061';
        children: BigUnion[];
    } |
    {
        name: '1062';
        children: BigUnion[];
    } |
    {
        name: '1063';
        children: BigUnion[];
    } |
    {
        name: '1064';
        children: BigUnion[];
    } |
    {
        name: '1065';
        children: BigUnion[];
    } |
    {
        name: '1066';
        children: BigUnion[];
    } |
    {
        name: '1067';
        children: BigUnion[];
    } |
    {
        name: '1068';
        children: BigUnion[];
    } |
    {
        name: '1069';
        children: BigUnion[];
    } |
    {
        name: '1070';
        children: BigUnion[];
    } |
    {
        name: '1071';
        children: BigUnion[];
    } |
    {
        name: '1072';
        children: BigUnion[];
    } |
    {
        name: '1073';
        children: BigUnion[];
    } |
    {
        name: '1074';
        children: BigUnion[];
    } |
    {
        name: '1075';
        children: BigUnion[];
    } |
    {
        name: '1076';
        children: BigUnion[];
    } |
    {
        name: '1077';
        children: BigUnion[];
    } |
    {
        name: '1078';
        children: BigUnion[];
    } |
    {
        name: '1079';
        children: BigUnion[];
    } |
    {
        name: '1080';
        children: BigUnion[];
    } |
    {
        name: '1081';
        children: BigUnion[];
    } |
    {
        name: '1082';
        children: BigUnion[];
    } |
    {
        name: '1083';
        children: BigUnion[];
    } |
    {
        name: '1084';
        children: BigUnion[];
    } |
    {
        name: '1085';
        children: BigUnion[];
    } |
    {
        name: '1086';
        children: BigUnion[];
    } |
    {
        name: '1087';
        children: BigUnion[];
    } |
    {
        name: '1088';
        children: BigUnion[];
    } |
    {
        name: '1089';
        children: BigUnion[];
    } |
    {
        name: '1090';
        children: BigUnion[];
    } |
    {
        name: '1091';
        children: BigUnion[];
    } |
    {
        name: '1092';
        children: BigUnion[];
    } |
    {
        name: '1093';
        children: BigUnion[];
    } |
    {
        name: '1094';
        children: BigUnion[];
    } |
    {
        name: '1095';
        children: BigUnion[];
    } |
    {
        name: '1096';
        children: BigUnion[];
    } |
    {
        name: '1097';
        children: BigUnion[];
    } |
    {
        name: '1098';
        children: BigUnion[];
    } |
    {
        name: '1099';
        children: BigUnion[];
    } |
    {
        name: '1100';
        children: BigUnion[];
    } |
    {
        name: '1101';
        children: BigUnion[];
    } |
    {
        name: '1102';
        children: BigUnion[];
    } |
    {
        name: '1103';
        children: BigUnion[];
    } |
    {
        name: '1104';
        children: BigUnion[];
    } |
    {
        name: '1105';
        children: BigUnion[];
    } |
    {
        name: '1106';
        children: BigUnion[];
    } |
    {
        name: '1107';
        children: BigUnion[];
    } |
    {
        name: '1108';
        children: BigUnion[];
    } |
    {
        name: '1109';
        children: BigUnion[];
    } |
    {
        name: '1110';
        children: BigUnion[];
    } |
    {
        name: '1111';
        children: BigUnion[];
    } |
    {
        name: '1112';
        children: BigUnion[];
    } |
    {
        name: '1113';
        children: BigUnion[];
    } |
    {
        name: '1114';
        children: BigUnion[];
    } |
    {
        name: '1115';
        children: BigUnion[];
    } |
    {
        name: '1116';
        children: BigUnion[];
    } |
    {
        name: '1117';
        children: BigUnion[];
    } |
    {
        name: '1118';
        children: BigUnion[];
    } |
    {
        name: '1119';
        children: BigUnion[];
    } |
    {
        name: '1120';
        children: BigUnion[];
    } |
    {
        name: '1121';
        children: BigUnion[];
    } |
    {
        name: '1122';
        children: BigUnion[];
    } |
    {
        name: '1123';
        children: BigUnion[];
    } |
    {
        name: '1124';
        children: BigUnion[];
    } |
    {
        name: '1125';
        children: BigUnion[];
    } |
    {
        name: '1126';
        children: BigUnion[];
    } |
    {
        name: '1127';
        children: BigUnion[];
    } |
    {
        name: '1128';
        children: BigUnion[];
    } |
    {
        name: '1129';
        children: BigUnion[];
    } |
    {
        name: '1130';
        children: BigUnion[];
    } |
    {
        name: '1131';
        children: BigUnion[];
    } |
    {
        name: '1132';
        children: BigUnion[];
    } |
    {
        name: '1133';
        children: BigUnion[];
    } |
    {
        name: '1134';
        children: BigUnion[];
    } |
    {
        name: '1135';
        children: BigUnion[];
    } |
    {
        name: '1136';
        children: BigUnion[];
    } |
    {
        name: '1137';
        children: BigUnion[];
    } |
    {
        name: '1138';
        children: BigUnion[];
    } |
    {
        name: '1139';
        children: BigUnion[];
    } |
    {
        name: '1140';
        children: BigUnion[];
    } |
    {
        name: '1141';
        children: BigUnion[];
    } |
    {
        name: '1142';
        children: BigUnion[];
    } |
    {
        name: '1143';
        children: BigUnion[];
    } |
    {
        name: '1144';
        children: BigUnion[];
    } |
    {
        name: '1145';
        children: BigUnion[];
    } |
    {
        name: '1146';
        children: BigUnion[];
    } |
    {
        name: '1147';
        children: BigUnion[];
    } |
    {
        name: '1148';
        children: BigUnion[];
    } |
    {
        name: '1149';
        children: BigUnion[];
    } |
    {
        name: '1150';
        children: BigUnion[];
    } |
    {
        name: '1151';
        children: BigUnion[];
    } |
    {
        name: '1152';
        children: BigUnion[];
    } |
    {
        name: '1153';
        children: BigUnion[];
    } |
    {
        name: '1154';
        children: BigUnion[];
    } |
    {
        name: '1155';
        children: BigUnion[];
    } |
    {
        name: '1156';
        children: BigUnion[];
    } |
    {
        name: '1157';
        children: BigUnion[];
    } |
    {
        name: '1158';
        children: BigUnion[];
    } |
    {
        name: '1159';
        children: BigUnion[];
    } |
    {
        name: '1160';
        children: BigUnion[];
    } |
    {
        name: '1161';
        children: BigUnion[];
    } |
    {
        name: '1162';
        children: BigUnion[];
    } |
    {
        name: '1163';
        children: BigUnion[];
    } |
    {
        name: '1164';
        children: BigUnion[];
    } |
    {
        name: '1165';
        children: BigUnion[];
    } |
    {
        name: '1166';
        children: BigUnion[];
    } |
    {
        name: '1167';
        children: BigUnion[];
    } |
    {
        name: '1168';
        children: BigUnion[];
    } |
    {
        name: '1169';
        children: BigUnion[];
    } |
    {
        name: '1170';
        children: BigUnion[];
    } |
    {
        name: '1171';
        children: BigUnion[];
    } |
    {
        name: '1172';
        children: BigUnion[];
    } |
    {
        name: '1173';
        children: BigUnion[];
    } |
    {
        name: '1174';
        children: BigUnion[];
    } |
    {
        name: '1175';
        children: BigUnion[];
    } |
    {
        name: '1176';
        children: BigUnion[];
    } |
    {
        name: '1177';
        children: BigUnion[];
    } |
    {
        name: '1178';
        children: BigUnion[];
    } |
    {
        name: '1179';
        children: BigUnion[];
    } |
    {
        name: '1180';
        children: BigUnion[];
    } |
    {
        name: '1181';
        children: BigUnion[];
    } |
    {
        name: '1182';
        children: BigUnion[];
    } |
    {
        name: '1183';
        children: BigUnion[];
    } |
    {
        name: '1184';
        children: BigUnion[];
    } |
    {
        name: '1185';
        children: BigUnion[];
    } |
    {
        name: '1186';
        children: BigUnion[];
    } |
    {
        name: '1187';
        children: BigUnion[];
    } |
    {
        name: '1188';
        children: BigUnion[];
    } |
    {
        name: '1189';
        children: BigUnion[];
    } |
    {
        name: '1190';
        children: BigUnion[];
    } |
    {
        name: '1191';
        children: BigUnion[];
    } |
    {
        name: '1192';
        children: BigUnion[];
    } |
    {
        name: '1193';
        children: BigUnion[];
    } |
    {
        name: '1194';
        children: BigUnion[];
    } |
    {
        name: '1195';
        children: BigUnion[];
    } |
    {
        name: '1196';
        children: BigUnion[];
    } |
    {
        name: '1197';
        children: BigUnion[];
    } |
    {
        name: '1198';
        children: BigUnion[];
    } |
    {
        name: '1199';
        children: BigUnion[];
    } |
    {
        name: '1200';
        children: BigUnion[];
    } |
    {
        name: '1201';
        children: BigUnion[];
    } |
    {
        name: '1202';
        children: BigUnion[];
    } |
    {
        name: '1203';
        children: BigUnion[];
    } |
    {
        name: '1204';
        children: BigUnion[];
    } |
    {
        name: '1205';
        children: BigUnion[];
    } |
    {
        name: '1206';
        children: BigUnion[];
    } |
    {
        name: '1207';
        children: BigUnion[];
    } |
    {
        name: '1208';
        children: BigUnion[];
    } |
    {
        name: '1209';
        children: BigUnion[];
    } |
    {
        name: '1210';
        children: BigUnion[];
    } |
    {
        name: '1211';
        children: BigUnion[];
    } |
    {
        name: '1212';
        children: BigUnion[];
    } |
    {
        name: '1213';
        children: BigUnion[];
    } |
    {
        name: '1214';
        children: BigUnion[];
    } |
    {
        name: '1215';
        children: BigUnion[];
    } |
    {
        name: '1216';
        children: BigUnion[];
    } |
    {
        name: '1217';
        children: BigUnion[];
    } |
    {
        name: '1218';
        children: BigUnion[];
    } |
    {
        name: '1219';
        children: BigUnion[];
    } |
    {
        name: '1220';
        children: BigUnion[];
    } |
    {
        name: '1221';
        children: BigUnion[];
    } |
    {
        name: '1222';
        children: BigUnion[];
    } |
    {
        name: '1223';
        children: BigUnion[];
    } |
    {
        name: '1224';
        children: BigUnion[];
    } |
    {
        name: '1225';
        children: BigUnion[];
    } |
    {
        name: '1226';
        children: BigUnion[];
    } |
    {
        name: '1227';
        children: BigUnion[];
    } |
    {
        name: '1228';
        children: BigUnion[];
    } |
    {
        name: '1229';
        children: BigUnion[];
    } |
    {
        name: '1230';
        children: BigUnion[];
    } |
    {
        name: '1231';
        children: BigUnion[];
    } |
    {
        name: '1232';
        children: BigUnion[];
    } |
    {
        name: '1233';
        children: BigUnion[];
    } |
    {
        name: '1234';
        children: BigUnion[];
    } |
    {
        name: '1235';
        children: BigUnion[];
    } |
    {
        name: '1236';
        children: BigUnion[];
    } |
    {
        name: '1237';
        children: BigUnion[];
    } |
    {
        name: '1238';
        children: BigUnion[];
    } |
    {
        name: '1239';
        children: BigUnion[];
    } |
    {
        name: '1240';
        children: BigUnion[];
    } |
    {
        name: '1241';
        children: BigUnion[];
    } |
    {
        name: '1242';
        children: BigUnion[];
    } |
    {
        name: '1243';
        children: BigUnion[];
    } |
    {
        name: '1244';
        children: BigUnion[];
    } |
    {
        name: '1245';
        children: BigUnion[];
    } |
    {
        name: '1246';
        children: BigUnion[];
    } |
    {
        name: '1247';
        children: BigUnion[];
    } |
    {
        name: '1248';
        children: BigUnion[];
    } |
    {
        name: '1249';
        children: BigUnion[];
    } |
    {
        name: '1250';
        children: BigUnion[];
    } |
    {
        name: '1251';
        children: BigUnion[];
    } |
    {
        name: '1252';
        children: BigUnion[];
    } |
    {
        name: '1253';
        children: BigUnion[];
    } |
    {
        name: '1254';
        children: BigUnion[];
    } |
    {
        name: '1255';
        children: BigUnion[];
    } |
    {
        name: '1256';
        children: BigUnion[];
    } |
    {
        name: '1257';
        children: BigUnion[];
    } |
    {
        name: '1258';
        children: BigUnion[];
    } |
    {
        name: '1259';
        children: BigUnion[];
    } |
    {
        name: '1260';
        children: BigUnion[];
    } |
    {
        name: '1261';
        children: BigUnion[];
    } |
    {
        name: '1262';
        children: BigUnion[];
    } |
    {
        name: '1263';
        children: BigUnion[];
    } |
    {
        name: '1264';
        children: BigUnion[];
    } |
    {
        name: '1265';
        children: BigUnion[];
    } |
    {
        name: '1266';
        children: BigUnion[];
    } |
    {
        name: '1267';
        children: BigUnion[];
    } |
    {
        name: '1268';
        children: BigUnion[];
    } |
    {
        name: '1269';
        children: BigUnion[];
    } |
    {
        name: '1270';
        children: BigUnion[];
    } |
    {
        name: '1271';
        children: BigUnion[];
    } |
    {
        name: '1272';
        children: BigUnion[];
    } |
    {
        name: '1273';
        children: BigUnion[];
    } |
    {
        name: '1274';
        children: BigUnion[];
    } |
    {
        name: '1275';
        children: BigUnion[];
    } |
    {
        name: '1276';
        children: BigUnion[];
    } |
    {
        name: '1277';
        children: BigUnion[];
    } |
    {
        name: '1278';
        children: BigUnion[];
    } |
    {
        name: '1279';
        children: BigUnion[];
    } |
    {
        name: '1280';
        children: BigUnion[];
    } |
    {
        name: '1281';
        children: BigUnion[];
    } |
    {
        name: '1282';
        children: BigUnion[];
    } |
    {
        name: '1283';
        children: BigUnion[];
    } |
    {
        name: '1284';
        children: BigUnion[];
    } |
    {
        name: '1285';
        children: BigUnion[];
    } |
    {
        name: '1286';
        children: BigUnion[];
    } |
    {
        name: '1287';
        children: BigUnion[];
    } |
    {
        name: '1288';
        children: BigUnion[];
    } |
    {
        name: '1289';
        children: BigUnion[];
    } |
    {
        name: '1290';
        children: BigUnion[];
    } |
    {
        name: '1291';
        children: BigUnion[];
    } |
    {
        name: '1292';
        children: BigUnion[];
    } |
    {
        name: '1293';
        children: BigUnion[];
    } |
    {
        name: '1294';
        children: BigUnion[];
    } |
    {
        name: '1295';
        children: BigUnion[];
    } |
    {
        name: '1296';
        children: BigUnion[];
    } |
    {
        name: '1297';
        children: BigUnion[];
    } |
    {
        name: '1298';
        children: BigUnion[];
    } |
    {
        name: '1299';
        children: BigUnion[];
    } |
    {
        name: '1300';
        children: BigUnion[];
    } |
    {
        name: '1301';
        children: BigUnion[];
    } |
    {
        name: '1302';
        children: BigUnion[];
    } |
    {
        name: '1303';
        children: BigUnion[];
    } |
    {
        name: '1304';
        children: BigUnion[];
    } |
    {
        name: '1305';
        children: BigUnion[];
    } |
    {
        name: '1306';
        children: BigUnion[];
    } |
    {
        name: '1307';
        children: BigUnion[];
    } |
    {
        name: '1308';
        children: BigUnion[];
    } |
    {
        name: '1309';
        children: BigUnion[];
    } |
    {
        name: '1310';
        children: BigUnion[];
    } |
    {
        name: '1311';
        children: BigUnion[];
    } |
    {
        name: '1312';
        children: BigUnion[];
    } |
    {
        name: '1313';
        children: BigUnion[];
    } |
    {
        name: '1314';
        children: BigUnion[];
    } |
    {
        name: '1315';
        children: BigUnion[];
    } |
    {
        name: '1316';
        children: BigUnion[];
    } |
    {
        name: '1317';
        children: BigUnion[];
    } |
    {
        name: '1318';
        children: BigUnion[];
    } |
    {
        name: '1319';
        children: BigUnion[];
    } |
    {
        name: '1320';
        children: BigUnion[];
    } |
    {
        name: '1321';
        children: BigUnion[];
    } |
    {
        name: '1322';
        children: BigUnion[];
    } |
    {
        name: '1323';
        children: BigUnion[];
    } |
    {
        name: '1324';
        children: BigUnion[];
    } |
    {
        name: '1325';
        children: BigUnion[];
    } |
    {
        name: '1326';
        children: BigUnion[];
    } |
    {
        name: '1327';
        children: BigUnion[];
    } |
    {
        name: '1328';
        children: BigUnion[];
    } |
    {
        name: '1329';
        children: BigUnion[];
    } |
    {
        name: '1330';
        children: BigUnion[];
    } |
    {
        name: '1331';
        children: BigUnion[];
    } |
    {
        name: '1332';
        children: BigUnion[];
    } |
    {
        name: '1333';
        children: BigUnion[];
    } |
    {
        name: '1334';
        children: BigUnion[];
    } |
    {
        name: '1335';
        children: BigUnion[];
    } |
    {
        name: '1336';
        children: BigUnion[];
    } |
    {
        name: '1337';
        children: BigUnion[];
    } |
    {
        name: '1338';
        children: BigUnion[];
    } |
    {
        name: '1339';
        children: BigUnion[];
    } |
    {
        name: '1340';
        children: BigUnion[];
    } |
    {
        name: '1341';
        children: BigUnion[];
    } |
    {
        name: '1342';
        children: BigUnion[];
    } |
    {
        name: '1343';
        children: BigUnion[];
    } |
    {
        name: '1344';
        children: BigUnion[];
    } |
    {
        name: '1345';
        children: BigUnion[];
    } |
    {
        name: '1346';
        children: BigUnion[];
    } |
    {
        name: '1347';
        children: BigUnion[];
    } |
    {
        name: '1348';
        children: BigUnion[];
    } |
    {
        name: '1349';
        children: BigUnion[];
    } |
    {
        name: '1350';
        children: BigUnion[];
    } |
    {
        name: '1351';
        children: BigUnion[];
    } |
    {
        name: '1352';
        children: BigUnion[];
    } |
    {
        name: '1353';
        children: BigUnion[];
    } |
    {
        name: '1354';
        children: BigUnion[];
    } |
    {
        name: '1355';
        children: BigUnion[];
    } |
    {
        name: '1356';
        children: BigUnion[];
    } |
    {
        name: '1357';
        children: BigUnion[];
    } |
    {
        name: '1358';
        children: BigUnion[];
    } |
    {
        name: '1359';
        children: BigUnion[];
    } |
    {
        name: '1360';
        children: BigUnion[];
    } |
    {
        name: '1361';
        children: BigUnion[];
    } |
    {
        name: '1362';
        children: BigUnion[];
    } |
    {
        name: '1363';
        children: BigUnion[];
    } |
    {
        name: '1364';
        children: BigUnion[];
    } |
    {
        name: '1365';
        children: BigUnion[];
    } |
    {
        name: '1366';
        children: BigUnion[];
    } |
    {
        name: '1367';
        children: BigUnion[];
    } |
    {
        name: '1368';
        children: BigUnion[];
    } |
    {
        name: '1369';
        children: BigUnion[];
    } |
    {
        name: '1370';
        children: BigUnion[];
    } |
    {
        name: '1371';
        children: BigUnion[];
    } |
    {
        name: '1372';
        children: BigUnion[];
    } |
    {
        name: '1373';
        children: BigUnion[];
    } |
    {
        name: '1374';
        children: BigUnion[];
    } |
    {
        name: '1375';
        children: BigUnion[];
    } |
    {
        name: '1376';
        children: BigUnion[];
    } |
    {
        name: '1377';
        children: BigUnion[];
    } |
    {
        name: '1378';
        children: BigUnion[];
    } |
    {
        name: '1379';
        children: BigUnion[];
    } |
    {
        name: '1380';
        children: BigUnion[];
    } |
    {
        name: '1381';
        children: BigUnion[];
    } |
    {
        name: '1382';
        children: BigUnion[];
    } |
    {
        name: '1383';
        children: BigUnion[];
    } |
    {
        name: '1384';
        children: BigUnion[];
    } |
    {
        name: '1385';
        children: BigUnion[];
    } |
    {
        name: '1386';
        children: BigUnion[];
    } |
    {
        name: '1387';
        children: BigUnion[];
    } |
    {
        name: '1388';
        children: BigUnion[];
    } |
    {
        name: '1389';
        children: BigUnion[];
    } |
    {
        name: '1390';
        children: BigUnion[];
    } |
    {
        name: '1391';
        children: BigUnion[];
    } |
    {
        name: '1392';
        children: BigUnion[];
    } |
    {
        name: '1393';
        children: BigUnion[];
    } |
    {
        name: '1394';
        children: BigUnion[];
    } |
    {
        name: '1395';
        children: BigUnion[];
    } |
    {
        name: '1396';
        children: BigUnion[];
    } |
    {
        name: '1397';
        children: BigUnion[];
    } |
    {
        name: '1398';
        children: BigUnion[];
    } |
    {
        name: '1399';
        children: BigUnion[];
    } |
    {
        name: '1400';
        children: BigUnion[];
    } |
    {
        name: '1401';
        children: BigUnion[];
    } |
    {
        name: '1402';
        children: BigUnion[];
    } |
    {
        name: '1403';
        children: BigUnion[];
    } |
    {
        name: '1404';
        children: BigUnion[];
    } |
    {
        name: '1405';
        children: BigUnion[];
    } |
    {
        name: '1406';
        children: BigUnion[];
    } |
    {
        name: '1407';
        children: BigUnion[];
    } |
    {
        name: '1408';
        children: BigUnion[];
    } |
    {
        name: '1409';
        children: BigUnion[];
    } |
    {
        name: '1410';
        children: BigUnion[];
    } |
    {
        name: '1411';
        children: BigUnion[];
    } |
    {
        name: '1412';
        children: BigUnion[];
    } |
    {
        name: '1413';
        children: BigUnion[];
    } |
    {
        name: '1414';
        children: BigUnion[];
    } |
    {
        name: '1415';
        children: BigUnion[];
    } |
    {
        name: '1416';
        children: BigUnion[];
    } |
    {
        name: '1417';
        children: BigUnion[];
    } |
    {
        name: '1418';
        children: BigUnion[];
    } |
    {
        name: '1419';
        children: BigUnion[];
    } |
    {
        name: '1420';
        children: BigUnion[];
    } |
    {
        name: '1421';
        children: BigUnion[];
    } |
    {
        name: '1422';
        children: BigUnion[];
    } |
    {
        name: '1423';
        children: BigUnion[];
    } |
    {
        name: '1424';
        children: BigUnion[];
    } |
    {
        name: '1425';
        children: BigUnion[];
    } |
    {
        name: '1426';
        children: BigUnion[];
    } |
    {
        name: '1427';
        children: BigUnion[];
    } |
    {
        name: '1428';
        children: BigUnion[];
    } |
    {
        name: '1429';
        children: BigUnion[];
    } |
    {
        name: '1430';
        children: BigUnion[];
    } |
    {
        name: '1431';
        children: BigUnion[];
    } |
    {
        name: '1432';
        children: BigUnion[];
    } |
    {
        name: '1433';
        children: BigUnion[];
    } |
    {
        name: '1434';
        children: BigUnion[];
    } |
    {
        name: '1435';
        children: BigUnion[];
    } |
    {
        name: '1436';
        children: BigUnion[];
    } |
    {
        name: '1437';
        children: BigUnion[];
    } |
    {
        name: '1438';
        children: BigUnion[];
    } |
    {
        name: '1439';
        children: BigUnion[];
    } |
    {
        name: '1440';
        children: BigUnion[];
    } |
    {
        name: '1441';
        children: BigUnion[];
    } |
    {
        name: '1442';
        children: BigUnion[];
    } |
    {
        name: '1443';
        children: BigUnion[];
    } |
    {
        name: '1444';
        children: BigUnion[];
    } |
    {
        name: '1445';
        children: BigUnion[];
    } |
    {
        name: '1446';
        children: BigUnion[];
    } |
    {
        name: '1447';
        children: BigUnion[];
    } |
    {
        name: '1448';
        children: BigUnion[];
    } |
    {
        name: '1449';
        children: BigUnion[];
    } |
    {
        name: '1450';
        children: BigUnion[];
    } |
    {
        name: '1451';
        children: BigUnion[];
    } |
    {
        name: '1452';
        children: BigUnion[];
    } |
    {
        name: '1453';
        children: BigUnion[];
    } |
    {
        name: '1454';
        children: BigUnion[];
    } |
    {
        name: '1455';
        children: BigUnion[];
    } |
    {
        name: '1456';
        children: BigUnion[];
    } |
    {
        name: '1457';
        children: BigUnion[];
    } |
    {
        name: '1458';
        children: BigUnion[];
    } |
    {
        name: '1459';
        children: BigUnion[];
    } |
    {
        name: '1460';
        children: BigUnion[];
    } |
    {
        name: '1461';
        children: BigUnion[];
    } |
    {
        name: '1462';
        children: BigUnion[];
    } |
    {
        name: '1463';
        children: BigUnion[];
    } |
    {
        name: '1464';
        children: BigUnion[];
    } |
    {
        name: '1465';
        children: BigUnion[];
    } |
    {
        name: '1466';
        children: BigUnion[];
    } |
    {
        name: '1467';
        children: BigUnion[];
    } |
    {
        name: '1468';
        children: BigUnion[];
    } |
    {
        name: '1469';
        children: BigUnion[];
    } |
    {
        name: '1470';
        children: BigUnion[];
    } |
    {
        name: '1471';
        children: BigUnion[];
    } |
    {
        name: '1472';
        children: BigUnion[];
    } |
    {
        name: '1473';
        children: BigUnion[];
    } |
    {
        name: '1474';
        children: BigUnion[];
    } |
    {
        name: '1475';
        children: BigUnion[];
    } |
    {
        name: '1476';
        children: BigUnion[];
    } |
    {
        name: '1477';
        children: BigUnion[];
    } |
    {
        name: '1478';
        children: BigUnion[];
    } |
    {
        name: '1479';
        children: BigUnion[];
    } |
    {
        name: '1480';
        children: BigUnion[];
    } |
    {
        name: '1481';
        children: BigUnion[];
    } |
    {
        name: '1482';
        children: BigUnion[];
    } |
    {
        name: '1483';
        children: BigUnion[];
    } |
    {
        name: '1484';
        children: BigUnion[];
    } |
    {
        name: '1485';
        children: BigUnion[];
    } |
    {
        name: '1486';
        children: BigUnion[];
    } |
    {
        name: '1487';
        children: BigUnion[];
    } |
    {
        name: '1488';
        children: BigUnion[];
    } |
    {
        name: '1489';
        children: BigUnion[];
    } |
    {
        name: '1490';
        children: BigUnion[];
    } |
    {
        name: '1491';
        children: BigUnion[];
    } |
    {
        name: '1492';
        children: BigUnion[];
    } |
    {
        name: '1493';
        children: BigUnion[];
    } |
    {
        name: '1494';
        children: BigUnion[];
    } |
    {
        name: '1495';
        children: BigUnion[];
    } |
    {
        name: '1496';
        children: BigUnion[];
    } |
    {
        name: '1497';
        children: BigUnion[];
    } |
    {
        name: '1498';
        children: BigUnion[];
    } |
    {
        name: '1499';
        children: BigUnion[];
    } |
    {
        name: '1500';
        children: BigUnion[];
    } |
    {
        name: '1501';
        children: BigUnion[];
    } |
    {
        name: '1502';
        children: BigUnion[];
    } |
    {
        name: '1503';
        children: BigUnion[];
    } |
    {
        name: '1504';
        children: BigUnion[];
    } |
    {
        name: '1505';
        children: BigUnion[];
    } |
    {
        name: '1506';
        children: BigUnion[];
    } |
    {
        name: '1507';
        children: BigUnion[];
    } |
    {
        name: '1508';
        children: BigUnion[];
    } |
    {
        name: '1509';
        children: BigUnion[];
    } |
    {
        name: '1510';
        children: BigUnion[];
    } |
    {
        name: '1511';
        children: BigUnion[];
    } |
    {
        name: '1512';
        children: BigUnion[];
    } |
    {
        name: '1513';
        children: BigUnion[];
    } |
    {
        name: '1514';
        children: BigUnion[];
    } |
    {
        name: '1515';
        children: BigUnion[];
    } |
    {
        name: '1516';
        children: BigUnion[];
    } |
    {
        name: '1517';
        children: BigUnion[];
    } |
    {
        name: '1518';
        children: BigUnion[];
    } |
    {
        name: '1519';
        children: BigUnion[];
    } |
    {
        name: '1520';
        children: BigUnion[];
    } |
    {
        name: '1521';
        children: BigUnion[];
    } |
    {
        name: '1522';
        children: BigUnion[];
    } |
    {
        name: '1523';
        children: BigUnion[];
    } |
    {
        name: '1524';
        children: BigUnion[];
    } |
    {
        name: '1525';
        children: BigUnion[];
    } |
    {
        name: '1526';
        children: BigUnion[];
    } |
    {
        name: '1527';
        children: BigUnion[];
    } |
    {
        name: '1528';
        children: BigUnion[];
    } |
    {
        name: '1529';
        children: BigUnion[];
    } |
    {
        name: '1530';
        children: BigUnion[];
    } |
    {
        name: '1531';
        children: BigUnion[];
    } |
    {
        name: '1532';
        children: BigUnion[];
    } |
    {
        name: '1533';
        children: BigUnion[];
    } |
    {
        name: '1534';
        children: BigUnion[];
    } |
    {
        name: '1535';
        children: BigUnion[];
    } |
    {
        name: '1536';
        children: BigUnion[];
    } |
    {
        name: '1537';
        children: BigUnion[];
    } |
    {
        name: '1538';
        children: BigUnion[];
    } |
    {
        name: '1539';
        children: BigUnion[];
    } |
    {
        name: '1540';
        children: BigUnion[];
    } |
    {
        name: '1541';
        children: BigUnion[];
    } |
    {
        name: '1542';
        children: BigUnion[];
    } |
    {
        name: '1543';
        children: BigUnion[];
    } |
    {
        name: '1544';
        children: BigUnion[];
    } |
    {
        name: '1545';
        children: BigUnion[];
    } |
    {
        name: '1546';
        children: BigUnion[];
    } |
    {
        name: '1547';
        children: BigUnion[];
    } |
    {
        name: '1548';
        children: BigUnion[];
    } |
    {
        name: '1549';
        children: BigUnion[];
    } |
    {
        name: '1550';
        children: BigUnion[];
    } |
    {
        name: '1551';
        children: BigUnion[];
    } |
    {
        name: '1552';
        children: BigUnion[];
    } |
    {
        name: '1553';
        children: BigUnion[];
    } |
    {
        name: '1554';
        children: BigUnion[];
    } |
    {
        name: '1555';
        children: BigUnion[];
    } |
    {
        name: '1556';
        children: BigUnion[];
    } |
    {
        name: '1557';
        children: BigUnion[];
    } |
    {
        name: '1558';
        children: BigUnion[];
    } |
    {
        name: '1559';
        children: BigUnion[];
    } |
    {
        name: '1560';
        children: BigUnion[];
    } |
    {
        name: '1561';
        children: BigUnion[];
    } |
    {
        name: '1562';
        children: BigUnion[];
    } |
    {
        name: '1563';
        children: BigUnion[];
    } |
    {
        name: '1564';
        children: BigUnion[];
    } |
    {
        name: '1565';
        children: BigUnion[];
    } |
    {
        name: '1566';
        children: BigUnion[];
    } |
    {
        name: '1567';
        children: BigUnion[];
    } |
    {
        name: '1568';
        children: BigUnion[];
    } |
    {
        name: '1569';
        children: BigUnion[];
    } |
    {
        name: '1570';
        children: BigUnion[];
    } |
    {
        name: '1571';
        children: BigUnion[];
    } |
    {
        name: '1572';
        children: BigUnion[];
    } |
    {
        name: '1573';
        children: BigUnion[];
    } |
    {
        name: '1574';
        children: BigUnion[];
    } |
    {
        name: '1575';
        children: BigUnion[];
    } |
    {
        name: '1576';
        children: BigUnion[];
    } |
    {
        name: '1577';
        children: BigUnion[];
    } |
    {
        name: '1578';
        children: BigUnion[];
    } |
    {
        name: '1579';
        children: BigUnion[];
    } |
    {
        name: '1580';
        children: BigUnion[];
    } |
    {
        name: '1581';
        children: BigUnion[];
    } |
    {
        name: '1582';
        children: BigUnion[];
    } |
    {
        name: '1583';
        children: BigUnion[];
    } |
    {
        name: '1584';
        children: BigUnion[];
    } |
    {
        name: '1585';
        children: BigUnion[];
    } |
    {
        name: '1586';
        children: BigUnion[];
    } |
    {
        name: '1587';
        children: BigUnion[];
    } |
    {
        name: '1588';
        children: BigUnion[];
    } |
    {
        name: '1589';
        children: BigUnion[];
    } |
    {
        name: '1590';
        children: BigUnion[];
    } |
    {
        name: '1591';
        children: BigUnion[];
    } |
    {
        name: '1592';
        children: BigUnion[];
    } |
    {
        name: '1593';
        children: BigUnion[];
    } |
    {
        name: '1594';
        children: BigUnion[];
    } |
    {
        name: '1595';
        children: BigUnion[];
    } |
    {
        name: '1596';
        children: BigUnion[];
    } |
    {
        name: '1597';
        children: BigUnion[];
    } |
    {
        name: '1598';
        children: BigUnion[];
    } |
    {
        name: '1599';
        children: BigUnion[];
    } |
    {
        name: '1600';
        children: BigUnion[];
    } |
    {
        name: '1601';
        children: BigUnion[];
    } |
    {
        name: '1602';
        children: BigUnion[];
    } |
    {
        name: '1603';
        children: BigUnion[];
    } |
    {
        name: '1604';
        children: BigUnion[];
    } |
    {
        name: '1605';
        children: BigUnion[];
    } |
    {
        name: '1606';
        children: BigUnion[];
    } |
    {
        name: '1607';
        children: BigUnion[];
    } |
    {
        name: '1608';
        children: BigUnion[];
    } |
    {
        name: '1609';
        children: BigUnion[];
    } |
    {
        name: '1610';
        children: BigUnion[];
    } |
    {
        name: '1611';
        children: BigUnion[];
    } |
    {
        name: '1612';
        children: BigUnion[];
    } |
    {
        name: '1613';
        children: BigUnion[];
    } |
    {
        name: '1614';
        children: BigUnion[];
    } |
    {
        name: '1615';
        children: BigUnion[];
    } |
    {
        name: '1616';
        children: BigUnion[];
    } |
    {
        name: '1617';
        children: BigUnion[];
    } |
    {
        name: '1618';
        children: BigUnion[];
    } |
    {
        name: '1619';
        children: BigUnion[];
    } |
    {
        name: '1620';
        children: BigUnion[];
    } |
    {
        name: '1621';
        children: BigUnion[];
    } |
    {
        name: '1622';
        children: BigUnion[];
    } |
    {
        name: '1623';
        children: BigUnion[];
    } |
    {
        name: '1624';
        children: BigUnion[];
    } |
    {
        name: '1625';
        children: BigUnion[];
    } |
    {
        name: '1626';
        children: BigUnion[];
    } |
    {
        name: '1627';
        children: BigUnion[];
    } |
    {
        name: '1628';
        children: BigUnion[];
    } |
    {
        name: '1629';
        children: BigUnion[];
    } |
    {
        name: '1630';
        children: BigUnion[];
    } |
    {
        name: '1631';
        children: BigUnion[];
    } |
    {
        name: '1632';
        children: BigUnion[];
    } |
    {
        name: '1633';
        children: BigUnion[];
    } |
    {
        name: '1634';
        children: BigUnion[];
    } |
    {
        name: '1635';
        children: BigUnion[];
    } |
    {
        name: '1636';
        children: BigUnion[];
    } |
    {
        name: '1637';
        children: BigUnion[];
    } |
    {
        name: '1638';
        children: BigUnion[];
    } |
    {
        name: '1639';
        children: BigUnion[];
    } |
    {
        name: '1640';
        children: BigUnion[];
    } |
    {
        name: '1641';
        children: BigUnion[];
    } |
    {
        name: '1642';
        children: BigUnion[];
    } |
    {
        name: '1643';
        children: BigUnion[];
    } |
    {
        name: '1644';
        children: BigUnion[];
    } |
    {
        name: '1645';
        children: BigUnion[];
    } |
    {
        name: '1646';
        children: BigUnion[];
    } |
    {
        name: '1647';
        children: BigUnion[];
    } |
    {
        name: '1648';
        children: BigUnion[];
    } |
    {
        name: '1649';
        children: BigUnion[];
    } |
    {
        name: '1650';
        children: BigUnion[];
    } |
    {
        name: '1651';
        children: BigUnion[];
    } |
    {
        name: '1652';
        children: BigUnion[];
    } |
    {
        name: '1653';
        children: BigUnion[];
    } |
    {
        name: '1654';
        children: BigUnion[];
    } |
    {
        name: '1655';
        children: BigUnion[];
    } |
    {
        name: '1656';
        children: BigUnion[];
    } |
    {
        name: '1657';
        children: BigUnion[];
    } |
    {
        name: '1658';
        children: BigUnion[];
    } |
    {
        name: '1659';
        children: BigUnion[];
    } |
    {
        name: '1660';
        children: BigUnion[];
    } |
    {
        name: '1661';
        children: BigUnion[];
    } |
    {
        name: '1662';
        children: BigUnion[];
    } |
    {
        name: '1663';
        children: BigUnion[];
    } |
    {
        name: '1664';
        children: BigUnion[];
    } |
    {
        name: '1665';
        children: BigUnion[];
    } |
    {
        name: '1666';
        children: BigUnion[];
    } |
    {
        name: '1667';
        children: BigUnion[];
    } |
    {
        name: '1668';
        children: BigUnion[];
    } |
    {
        name: '1669';
        children: BigUnion[];
    } |
    {
        name: '1670';
        children: BigUnion[];
    } |
    {
        name: '1671';
        children: BigUnion[];
    } |
    {
        name: '1672';
        children: BigUnion[];
    } |
    {
        name: '1673';
        children: BigUnion[];
    } |
    {
        name: '1674';
        children: BigUnion[];
    } |
    {
        name: '1675';
        children: BigUnion[];
    } |
    {
        name: '1676';
        children: BigUnion[];
    } |
    {
        name: '1677';
        children: BigUnion[];
    } |
    {
        name: '1678';
        children: BigUnion[];
    } |
    {
        name: '1679';
        children: BigUnion[];
    } |
    {
        name: '1680';
        children: BigUnion[];
    } |
    {
        name: '1681';
        children: BigUnion[];
    } |
    {
        name: '1682';
        children: BigUnion[];
    } |
    {
        name: '1683';
        children: BigUnion[];
    } |
    {
        name: '1684';
        children: BigUnion[];
    } |
    {
        name: '1685';
        children: BigUnion[];
    } |
    {
        name: '1686';
        children: BigUnion[];
    } |
    {
        name: '1687';
        children: BigUnion[];
    } |
    {
        name: '1688';
        children: BigUnion[];
    } |
    {
        name: '1689';
        children: BigUnion[];
    } |
    {
        name: '1690';
        children: BigUnion[];
    } |
    {
        name: '1691';
        children: BigUnion[];
    } |
    {
        name: '1692';
        children: BigUnion[];
    } |
    {
        name: '1693';
        children: BigUnion[];
    } |
    {
        name: '1694';
        children: BigUnion[];
    } |
    {
        name: '1695';
        children: BigUnion[];
    } |
    {
        name: '1696';
        children: BigUnion[];
    } |
    {
        name: '1697';
        children: BigUnion[];
    } |
    {
        name: '1698';
        children: BigUnion[];
    } |
    {
        name: '1699';
        children: BigUnion[];
    } |
    {
        name: '1700';
        children: BigUnion[];
    } |
    {
        name: '1701';
        children: BigUnion[];
    } |
    {
        name: '1702';
        children: BigUnion[];
    } |
    {
        name: '1703';
        children: BigUnion[];
    } |
    {
        name: '1704';
        children: BigUnion[];
    } |
    {
        name: '1705';
        children: BigUnion[];
    } |
    {
        name: '1706';
        children: BigUnion[];
    } |
    {
        name: '1707';
        children: BigUnion[];
    } |
    {
        name: '1708';
        children: BigUnion[];
    } |
    {
        name: '1709';
        children: BigUnion[];
    } |
    {
        name: '1710';
        children: BigUnion[];
    } |
    {
        name: '1711';
        children: BigUnion[];
    } |
    {
        name: '1712';
        children: BigUnion[];
    } |
    {
        name: '1713';
        children: BigUnion[];
    } |
    {
        name: '1714';
        children: BigUnion[];
    } |
    {
        name: '1715';
        children: BigUnion[];
    } |
    {
        name: '1716';
        children: BigUnion[];
    } |
    {
        name: '1717';
        children: BigUnion[];
    } |
    {
        name: '1718';
        children: BigUnion[];
    } |
    {
        name: '1719';
        children: BigUnion[];
    } |
    {
        name: '1720';
        children: BigUnion[];
    } |
    {
        name: '1721';
        children: BigUnion[];
    } |
    {
        name: '1722';
        children: BigUnion[];
    } |
    {
        name: '1723';
        children: BigUnion[];
    } |
    {
        name: '1724';
        children: BigUnion[];
    } |
    {
        name: '1725';
        children: BigUnion[];
    } |
    {
        name: '1726';
        children: BigUnion[];
    } |
    {
        name: '1727';
        children: BigUnion[];
    } |
    {
        name: '1728';
        children: BigUnion[];
    } |
    {
        name: '1729';
        children: BigUnion[];
    } |
    {
        name: '1730';
        children: BigUnion[];
    } |
    {
        name: '1731';
        children: BigUnion[];
    } |
    {
        name: '1732';
        children: BigUnion[];
    } |
    {
        name: '1733';
        children: BigUnion[];
    } |
    {
        name: '1734';
        children: BigUnion[];
    } |
    {
        name: '1735';
        children: BigUnion[];
    } |
    {
        name: '1736';
        children: BigUnion[];
    } |
    {
        name: '1737';
        children: BigUnion[];
    } |
    {
        name: '1738';
        children: BigUnion[];
    } |
    {
        name: '1739';
        children: BigUnion[];
    } |
    {
        name: '1740';
        children: BigUnion[];
    } |
    {
        name: '1741';
        children: BigUnion[];
    } |
    {
        name: '1742';
        children: BigUnion[];
    } |
    {
        name: '1743';
        children: BigUnion[];
    } |
    {
        name: '1744';
        children: BigUnion[];
    } |
    {
        name: '1745';
        children: BigUnion[];
    } |
    {
        name: '1746';
        children: BigUnion[];
    } |
    {
        name: '1747';
        children: BigUnion[];
    } |
    {
        name: '1748';
        children: BigUnion[];
    } |
    {
        name: '1749';
        children: BigUnion[];
    } |
    {
        name: '1750';
        children: BigUnion[];
    } |
    {
        name: '1751';
        children: BigUnion[];
    } |
    {
        name: '1752';
        children: BigUnion[];
    } |
    {
        name: '1753';
        children: BigUnion[];
    } |
    {
        name: '1754';
        children: BigUnion[];
    } |
    {
        name: '1755';
        children: BigUnion[];
    } |
    {
        name: '1756';
        children: BigUnion[];
    } |
    {
        name: '1757';
        children: BigUnion[];
    } |
    {
        name: '1758';
        children: BigUnion[];
    } |
    {
        name: '1759';
        children: BigUnion[];
    } |
    {
        name: '1760';
        children: BigUnion[];
    } |
    {
        name: '1761';
        children: BigUnion[];
    } |
    {
        name: '1762';
        children: BigUnion[];
    } |
    {
        name: '1763';
        children: BigUnion[];
    } |
    {
        name: '1764';
        children: BigUnion[];
    } |
    {
        name: '1765';
        children: BigUnion[];
    } |
    {
        name: '1766';
        children: BigUnion[];
    } |
    {
        name: '1767';
        children: BigUnion[];
    } |
    {
        name: '1768';
        children: BigUnion[];
    } |
    {
        name: '1769';
        children: BigUnion[];
    } |
    {
        name: '1770';
        children: BigUnion[];
    } |
    {
        name: '1771';
        children: BigUnion[];
    } |
    {
        name: '1772';
        children: BigUnion[];
    } |
    {
        name: '1773';
        children: BigUnion[];
    } |
    {
        name: '1774';
        children: BigUnion[];
    } |
    {
        name: '1775';
        children: BigUnion[];
    } |
    {
        name: '1776';
        children: BigUnion[];
    } |
    {
        name: '1777';
        children: BigUnion[];
    } |
    {
        name: '1778';
        children: BigUnion[];
    } |
    {
        name: '1779';
        children: BigUnion[];
    } |
    {
        name: '1780';
        children: BigUnion[];
    } |
    {
        name: '1781';
        children: BigUnion[];
    } |
    {
        name: '1782';
        children: BigUnion[];
    } |
    {
        name: '1783';
        children: BigUnion[];
    } |
    {
        name: '1784';
        children: BigUnion[];
    } |
    {
        name: '1785';
        children: BigUnion[];
    } |
    {
        name: '1786';
        children: BigUnion[];
    } |
    {
        name: '1787';
        children: BigUnion[];
    } |
    {
        name: '1788';
        children: BigUnion[];
    } |
    {
        name: '1789';
        children: BigUnion[];
    } |
    {
        name: '1790';
        children: BigUnion[];
    } |
    {
        name: '1791';
        children: BigUnion[];
    } |
    {
        name: '1792';
        children: BigUnion[];
    } |
    {
        name: '1793';
        children: BigUnion[];
    } |
    {
        name: '1794';
        children: BigUnion[];
    } |
    {
        name: '1795';
        children: BigUnion[];
    } |
    {
        name: '1796';
        children: BigUnion[];
    } |
    {
        name: '1797';
        children: BigUnion[];
    } |
    {
        name: '1798';
        children: BigUnion[];
    } |
    {
        name: '1799';
        children: BigUnion[];
    } |
    {
        name: '1800';
        children: BigUnion[];
    } |
    {
        name: '1801';
        children: BigUnion[];
    } |
    {
        name: '1802';
        children: BigUnion[];
    } |
    {
        name: '1803';
        children: BigUnion[];
    } |
    {
        name: '1804';
        children: BigUnion[];
    } |
    {
        name: '1805';
        children: BigUnion[];
    } |
    {
        name: '1806';
        children: BigUnion[];
    } |
    {
        name: '1807';
        children: BigUnion[];
    } |
    {
        name: '1808';
        children: BigUnion[];
    } |
    {
        name: '1809';
        children: BigUnion[];
    } |
    {
        name: '1810';
        children: BigUnion[];
    } |
    {
        name: '1811';
        children: BigUnion[];
    } |
    {
        name: '1812';
        children: BigUnion[];
    } |
    {
        name: '1813';
        children: BigUnion[];
    } |
    {
        name: '1814';
        children: BigUnion[];
    } |
    {
        name: '1815';
        children: BigUnion[];
    } |
    {
        name: '1816';
        children: BigUnion[];
    } |
    {
        name: '1817';
        children: BigUnion[];
    } |
    {
        name: '1818';
        children: BigUnion[];
    } |
    {
        name: '1819';
        children: BigUnion[];
    } |
    {
        name: '1820';
        children: BigUnion[];
    } |
    {
        name: '1821';
        children: BigUnion[];
    } |
    {
        name: '1822';
        children: BigUnion[];
    } |
    {
        name: '1823';
        children: BigUnion[];
    } |
    {
        name: '1824';
        children: BigUnion[];
    } |
    {
        name: '1825';
        children: BigUnion[];
    } |
    {
        name: '1826';
        children: BigUnion[];
    } |
    {
        name: '1827';
        children: BigUnion[];
    } |
    {
        name: '1828';
        children: BigUnion[];
    } |
    {
        name: '1829';
        children: BigUnion[];
    } |
    {
        name: '1830';
        children: BigUnion[];
    } |
    {
        name: '1831';
        children: BigUnion[];
    } |
    {
        name: '1832';
        children: BigUnion[];
    } |
    {
        name: '1833';
        children: BigUnion[];
    } |
    {
        name: '1834';
        children: BigUnion[];
    } |
    {
        name: '1835';
        children: BigUnion[];
    } |
    {
        name: '1836';
        children: BigUnion[];
    } |
    {
        name: '1837';
        children: BigUnion[];
    } |
    {
        name: '1838';
        children: BigUnion[];
    } |
    {
        name: '1839';
        children: BigUnion[];
    } |
    {
        name: '1840';
        children: BigUnion[];
    } |
    {
        name: '1841';
        children: BigUnion[];
    } |
    {
        name: '1842';
        children: BigUnion[];
    } |
    {
        name: '1843';
        children: BigUnion[];
    } |
    {
        name: '1844';
        children: BigUnion[];
    } |
    {
        name: '1845';
        children: BigUnion[];
    } |
    {
        name: '1846';
        children: BigUnion[];
    } |
    {
        name: '1847';
        children: BigUnion[];
    } |
    {
        name: '1848';
        children: BigUnion[];
    } |
    {
        name: '1849';
        children: BigUnion[];
    } |
    {
        name: '1850';
        children: BigUnion[];
    } |
    {
        name: '1851';
        children: BigUnion[];
    } |
    {
        name: '1852';
        children: BigUnion[];
    } |
    {
        name: '1853';
        children: BigUnion[];
    } |
    {
        name: '1854';
        children: BigUnion[];
    } |
    {
        name: '1855';
        children: BigUnion[];
    } |
    {
        name: '1856';
        children: BigUnion[];
    } |
    {
        name: '1857';
        children: BigUnion[];
    } |
    {
        name: '1858';
        children: BigUnion[];
    } |
    {
        name: '1859';
        children: BigUnion[];
    } |
    {
        name: '1860';
        children: BigUnion[];
    } |
    {
        name: '1861';
        children: BigUnion[];
    } |
    {
        name: '1862';
        children: BigUnion[];
    } |
    {
        name: '1863';
        children: BigUnion[];
    } |
    {
        name: '1864';
        children: BigUnion[];
    } |
    {
        name: '1865';
        children: BigUnion[];
    } |
    {
        name: '1866';
        children: BigUnion[];
    } |
    {
        name: '1867';
        children: BigUnion[];
    } |
    {
        name: '1868';
        children: BigUnion[];
    } |
    {
        name: '1869';
        children: BigUnion[];
    } |
    {
        name: '1870';
        children: BigUnion[];
    } |
    {
        name: '1871';
        children: BigUnion[];
    } |
    {
        name: '1872';
        children: BigUnion[];
    } |
    {
        name: '1873';
        children: BigUnion[];
    } |
    {
        name: '1874';
        children: BigUnion[];
    } |
    {
        name: '1875';
        children: BigUnion[];
    } |
    {
        name: '1876';
        children: BigUnion[];
    } |
    {
        name: '1877';
        children: BigUnion[];
    } |
    {
        name: '1878';
        children: BigUnion[];
    } |
    {
        name: '1879';
        children: BigUnion[];
    } |
    {
        name: '1880';
        children: BigUnion[];
    } |
    {
        name: '1881';
        children: BigUnion[];
    } |
    {
        name: '1882';
        children: BigUnion[];
    } |
    {
        name: '1883';
        children: BigUnion[];
    } |
    {
        name: '1884';
        children: BigUnion[];
    } |
    {
        name: '1885';
        children: BigUnion[];
    } |
    {
        name: '1886';
        children: BigUnion[];
    } |
    {
        name: '1887';
        children: BigUnion[];
    } |
    {
        name: '1888';
        children: BigUnion[];
    } |
    {
        name: '1889';
        children: BigUnion[];
    } |
    {
        name: '1890';
        children: BigUnion[];
    } |
    {
        name: '1891';
        children: BigUnion[];
    } |
    {
        name: '1892';
        children: BigUnion[];
    } |
    {
        name: '1893';
        children: BigUnion[];
    } |
    {
        name: '1894';
        children: BigUnion[];
    } |
    {
        name: '1895';
        children: BigUnion[];
    } |
    {
        name: '1896';
        children: BigUnion[];
    } |
    {
        name: '1897';
        children: BigUnion[];
    } |
    {
        name: '1898';
        children: BigUnion[];
    } |
    {
        name: '1899';
        children: BigUnion[];
    } |
    {
        name: '1900';
        children: BigUnion[];
    } |
    {
        name: '1901';
        children: BigUnion[];
    } |
    {
        name: '1902';
        children: BigUnion[];
    } |
    {
        name: '1903';
        children: BigUnion[];
    } |
    {
        name: '1904';
        children: BigUnion[];
    } |
    {
        name: '1905';
        children: BigUnion[];
    } |
    {
        name: '1906';
        children: BigUnion[];
    } |
    {
        name: '1907';
        children: BigUnion[];
    } |
    {
        name: '1908';
        children: BigUnion[];
    } |
    {
        name: '1909';
        children: BigUnion[];
    } |
    {
        name: '1910';
        children: BigUnion[];
    } |
    {
        name: '1911';
        children: BigUnion[];
    } |
    {
        name: '1912';
        children: BigUnion[];
    } |
    {
        name: '1913';
        children: BigUnion[];
    } |
    {
        name: '1914';
        children: BigUnion[];
    } |
    {
        name: '1915';
        children: BigUnion[];
    } |
    {
        name: '1916';
        children: BigUnion[];
    } |
    {
        name: '1917';
        children: BigUnion[];
    } |
    {
        name: '1918';
        children: BigUnion[];
    } |
    {
        name: '1919';
        children: BigUnion[];
    } |
    {
        name: '1920';
        children: BigUnion[];
    } |
    {
        name: '1921';
        children: BigUnion[];
    } |
    {
        name: '1922';
        children: BigUnion[];
    } |
    {
        name: '1923';
        children: BigUnion[];
    } |
    {
        name: '1924';
        children: BigUnion[];
    } |
    {
        name: '1925';
        children: BigUnion[];
    } |
    {
        name: '1926';
        children: BigUnion[];
    } |
    {
        name: '1927';
        children: BigUnion[];
    } |
    {
        name: '1928';
        children: BigUnion[];
    } |
    {
        name: '1929';
        children: BigUnion[];
    } |
    {
        name: '1930';
        children: BigUnion[];
    } |
    {
        name: '1931';
        children: BigUnion[];
    } |
    {
        name: '1932';
        children: BigUnion[];
    } |
    {
        name: '1933';
        children: BigUnion[];
    } |
    {
        name: '1934';
        children: BigUnion[];
    } |
    {
        name: '1935';
        children: BigUnion[];
    } |
    {
        name: '1936';
        children: BigUnion[];
    } |
    {
        name: '1937';
        children: BigUnion[];
    } |
    {
        name: '1938';
        children: BigUnion[];
    } |
    {
        name: '1939';
        children: BigUnion[];
    } |
    {
        name: '1940';
        children: BigUnion[];
    } |
    {
        name: '1941';
        children: BigUnion[];
    } |
    {
        name: '1942';
        children: BigUnion[];
    } |
    {
        name: '1943';
        children: BigUnion[];
    } |
    {
        name: '1944';
        children: BigUnion[];
    } |
    {
        name: '1945';
        children: BigUnion[];
    } |
    {
        name: '1946';
        children: BigUnion[];
    } |
    {
        name: '1947';
        children: BigUnion[];
    } |
    {
        name: '1948';
        children: BigUnion[];
    } |
    {
        name: '1949';
        children: BigUnion[];
    } |
    {
        name: '1950';
        children: BigUnion[];
    } |
    {
        name: '1951';
        children: BigUnion[];
    } |
    {
        name: '1952';
        children: BigUnion[];
    } |
    {
        name: '1953';
        children: BigUnion[];
    } |
    {
        name: '1954';
        children: BigUnion[];
    } |
    {
        name: '1955';
        children: BigUnion[];
    } |
    {
        name: '1956';
        children: BigUnion[];
    } |
    {
        name: '1957';
        children: BigUnion[];
    } |
    {
        name: '1958';
        children: BigUnion[];
    } |
    {
        name: '1959';
        children: BigUnion[];
    } |
    {
        name: '1960';
        children: BigUnion[];
    } |
    {
        name: '1961';
        children: BigUnion[];
    } |
    {
        name: '1962';
        children: BigUnion[];
    } |
    {
        name: '1963';
        children: BigUnion[];
    } |
    {
        name: '1964';
        children: BigUnion[];
    } |
    {
        name: '1965';
        children: BigUnion[];
    } |
    {
        name: '1966';
        children: BigUnion[];
    } |
    {
        name: '1967';
        children: BigUnion[];
    } |
    {
        name: '1968';
        children: BigUnion[];
    } |
    {
        name: '1969';
        children: BigUnion[];
    } |
    {
        name: '1970';
        children: BigUnion[];
    } |
    {
        name: '1971';
        children: BigUnion[];
    } |
    {
        name: '1972';
        children: BigUnion[];
    } |
    {
        name: '1973';
        children: BigUnion[];
    } |
    {
        name: '1974';
        children: BigUnion[];
    } |
    {
        name: '1975';
        children: BigUnion[];
    } |
    {
        name: '1976';
        children: BigUnion[];
    } |
    {
        name: '1977';
        children: BigUnion[];
    } |
    {
        name: '1978';
        children: BigUnion[];
    } |
    {
        name: '1979';
        children: BigUnion[];
    } |
    {
        name: '1980';
        children: BigUnion[];
    } |
    {
        name: '1981';
        children: BigUnion[];
    } |
    {
        name: '1982';
        children: BigUnion[];
    } |
    {
        name: '1983';
        children: BigUnion[];
    } |
    {
        name: '1984';
        children: BigUnion[];
    } |
    {
        name: '1985';
        children: BigUnion[];
    } |
    {
        name: '1986';
        children: BigUnion[];
    } |
    {
        name: '1987';
        children: BigUnion[];
    } |
    {
        name: '1988';
        children: BigUnion[];
    } |
    {
        name: '1989';
        children: BigUnion[];
    } |
    {
        name: '1990';
        children: BigUnion[];
    } |
    {
        name: '1991';
        children: BigUnion[];
    } |
    {
        name: '1992';
        children: BigUnion[];
    } |
    {
        name: '1993';
        children: BigUnion[];
    } |
    {
        name: '1994';
        children: BigUnion[];
    } |
    {
        name: '1995';
        children: BigUnion[];
    } |
    {
        name: '1996';
        children: BigUnion[];
    } |
    {
        name: '1997';
        children: BigUnion[];
    } |
    {
        name: '1998';
        children: BigUnion[];
    } |
    {
        name: '1999';
        children: BigUnion[];
    };

type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;

type WithName<T extends BigUnion['name']> = DiscriminateUnion<BigUnion, 'name', T>;

type ChildrenOf<T extends BigUnion> = T['children'][number];

export function makeThing<T extends BigUnion['name']>(
    name: T,
    children: ChildrenOf<WithName<T>>[] = [],
) { }

//// [conditionalTypeDiscriminatingLargeUnionRegularTypeFetchingSpeedReasonable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeThing = makeThing;
function makeThing(name, children) {
    if (children === void 0) { children = []; }
}
