/* ==========================================================================
   data-90.js —— 《征途不息 · 薪火相传》内容数据
   说明：本文件集中存放路线节点、人物档案、知识题库与当代人物资料，
        页面结构与史料内容分离，便于后续核对与增补。
   史实依据：《中国共产党简史》、中央党史和文献研究院纪念长征胜利90周年专题、
        中国共产党新闻网等公开资料；地图坐标为示意性点位，非精确测绘。
   ========================================================================== */
window.LM90_DATA = (function () {
  "use strict";

  /* ------------------------------ 一、长征路线节点 ------------------------------ */
  var events = [
    {
      id: "yudu", no: "01", date: "1934年10月", year: "1934", title: "于都出发",
      place: "江西·于都", lat: 25.95, lon: 115.41, major: true,
      lalign: "start", ldx: 16, ldy: 5,
      key: "启程",
      summary: "1934年10月，中央红军主力从中央革命根据地出发，开始战略转移。10月中下旬，红军先后从于都河等渡口渡河，踏上长征之路。",
      sig: "于都是中央红军长征的集结出发地之一。出发时，中央红军连同后方机关共8.6万余人。",
      source: "《中国共产党简史》；中央党史和文献研究院纪念长征胜利90周年专题"
    },
    {
      id: "xiangjiang", no: "02", date: "1934年11月—12月", year: "1934", title: "湘江战役",
      place: "广西·全州、兴安", lat: 25.93, lon: 111.07, major: true,
      lalign: "start", ldx: 16, ldy: 16,
      key: "血战",
      summary: "中央红军在湘江两岸与国民党军展开殊死激战，付出巨大牺牲，突破第四道封锁线。渡过湘江后，中央红军由出发时的8.6万余人锐减至3万余人。",
      sig: "湘江战役是长征中最惨烈的战役之一。惨重代价促使党和红军深刻反思“左”倾教条主义军事指挥的错误。",
      source: "《中国共产党简史》"
    },
    {
      id: "tongdao", no: "03", date: "1934年12月", year: "1934", title: "通道转兵",
      place: "湖南·通道", lat: 26.16, lon: 109.78, major: false,
      lalign: "start", ldx: 14, ldy: 4,
      key: "转兵",
      summary: "1934年12月12日，中共中央负责人在通道召开紧急会议。会议接受毛泽东的建议，放弃北上湘西的原定计划，改向敌人力量薄弱的贵州前进。",
      sig: "通道转兵使红军避免了钻进敌人预设口袋的危险，为黎平会议、遵义会议实现伟大转折创造了条件。",
      source: "《中国共产党简史》"
    },
    {
      id: "liping", no: "04", date: "1934年12月", year: "1934", title: "黎平会议",
      place: "贵州·黎平", lat: 26.23, lon: 109.14, major: false,
      lalign: "end", ldx: -14, ldy: 6,
      key: "定向",
      summary: "1934年12月18日，中共中央政治局在黎平召开会议，正式决定中央红军向以遵义为中心的川黔边地区前进。",
      sig: "黎平会议使红军避免了陷入重围的危险，为遵义会议的召开作了重要准备。",
      source: "《中国共产党简史》"
    },
    {
      id: "houchang", no: "05", date: "1934年12月31日—1935年1月1日", year: "1935", title: "猴场会议",
      place: "贵州·瓮安猴场", lat: 27.07, lon: 107.47, major: false,
      lalign: "start", ldx: 14, ldy: 4,
      key: "蓄势",
      summary: "中央政治局在猴场召开会议，重申黎平会议决定，作出《关于渡江后新的行动方针的决定》，规定红军作战方针须在政治局会议上报告。",
      sig: "猴场会议在实际上限制了“左”倾教条主义者的军事独断，为遵义会议的召开进一步准备了条件。",
      source: "《中国共产党简史》"
    },
    {
      id: "zunyi", no: "06", date: "1935年1月", year: "1935", title: "遵义会议",
      place: "贵州·遵义", lat: 27.73, lon: 106.93, major: true,
      lalign: "start", ldx: 18, ldy: -8,
      key: "转折",
      summary: "1935年1月15日至17日，中共中央政治局在遵义召开扩大会议，总结第五次反“围剿”失败和长征初期失利的教训，纠正“左”倾教条主义的军事错误。",
      sig: "遵义会议确立了毛泽东在党中央和红军的领导地位，是中国共产党历史上一个生死攸关的转折点，标志着中国共产党开始独立自主地解决自己的路线、方针和政策问题。",
      image: "assets/images/ghlc/zyhy.png",
      imageNote: "遵义会议题材油画（原项目素材）",
      source: "《中国共产党简史》；遵义会议纪念馆"
    },
    {
      id: "chishui", no: "07", date: "1935年1月—3月", year: "1935", title: "四渡赤水",
      place: "贵州、四川、云南交界", lat: 28.58, lon: 105.70, major: true,
      lalign: "start", ldx: 18, ldy: 2,
      key: "机变",
      summary: "中央红军在毛泽东等指挥下，四次渡过赤水河，忽南忽北、声东击西，在川黔滇边界的广大地区与国民党军周旋。",
      sig: "四渡赤水摆脱了几十万国民党军的围追堵截，被誉为毛泽东军事指挥的“得意之笔”，是红军以少胜多、变被动为主动的经典战例。",
      source: "《中国共产党简史》"
    },
    {
      id: "jinshajiang", no: "08", date: "1935年5月", year: "1935", title: "巧渡金沙江",
      place: "云南·禄劝皎平渡", lat: 26.62, lon: 102.38, major: true,
      lalign: "end", ldx: -16, ldy: 6,
      key: "突围",
      summary: "中央红军在皎平渡等渡口，用找到的7条小船，历时9天9夜渡过金沙江，把国民党追兵甩在江南岸。",
      sig: "巧渡金沙江使红军跳出了几十万国民党军的包围圈，取得了战略转移中的决定性胜利。",
      source: "《中国共产党简史》"
    },
    {
      id: "anshunchang", no: "09", date: "1935年5月", year: "1935", title: "强渡大渡河",
      place: "四川·石棉安顺场", lat: 29.23, lon: 102.36, major: false,
      lalign: "start", ldx: 15, ldy: 16,
      key: "强渡",
      summary: "1935年5月25日，红一团17名勇士在安顺场乘一条小船，冒着密集火力强渡大渡河，为红军打开北上通道。",
      sig: "强渡大渡河打破了敌人凭借天险消灭红军的企图，为飞夺泸定桥赢得了宝贵时间。",
      source: "《中国共产党简史》；中国军网"
    },
    {
      id: "luding", no: "10", date: "1935年5月", year: "1935", title: "飞夺泸定桥",
      place: "四川·泸定", lat: 29.91, lon: 102.23, major: true,
      lalign: "start", ldx: 17, ldy: -4,
      key: "奇袭",
      summary: "1935年5月29日，红四团22名突击队员冒着枪林弹雨，攀踏被抽去桥板的铁索，夺占泸定桥，打开了红军北上的通道。",
      sig: "飞夺泸定桥粉碎了敌人妄图让红军成为“石达开第二”的企图，是长征中英勇顽强的经典战例。",
      source: "《中国共产党简史》；中国军网"
    },
    {
      id: "jiajinshan", no: "11", date: "1935年6月", year: "1935", title: "翻越夹金山",
      place: "四川·宝兴", lat: 30.75, lon: 102.75, major: false,
      lalign: "end", ldx: -15, ldy: -6,
      key: "雪山",
      summary: "中央红军翻越长征途中第一座大雪山——海拔4000多米的夹金山。空气稀薄、风雪交加，许多战士因高寒缺氧牺牲。",
      sig: "翻越夹金山是红军征服雪山草地的开始，展现了红军将士超越生理极限的顽强意志。",
      image: "assets/images/h1.jpg",
      imageNote: "长征雪山主题插画（原项目素材，非史实照片）",
      source: "《中国共产党简史》"
    },
    {
      id: "maogong", no: "12", date: "1935年6月", year: "1935", title: "懋功会师",
      place: "四川·小金", lat: 30.99, lon: 102.36, major: false,
      lalign: "start", ldx: 15, ldy: 4,
      key: "会合",
      summary: "1935年6月，红一方面军与红四方面军在懋功地区会师，红军力量得到集中。",
      sig: "懋功会师为红军继续北上创造了有利条件，也使党内关于战略方针的分歧逐渐显现。",
      source: "《中国共产党简史》"
    },
    {
      id: "caodi", no: "13", date: "1935年8月", year: "1935", title: "穿越草地",
      place: "四川·松潘草地", lat: 32.65, lon: 103.60, major: true,
      lalign: "start", ldx: 16, ldy: 4,
      key: "草地",
      summary: "红军进入茫茫水草地，沼泽遍布、气候无常，粮食匮乏。战士们挖野菜、煮皮带，许多人牺牲在这片人迹罕至的荒原上。",
      sig: "过草地是长征中最艰苦的行军之一，集中体现了红军将士的革命意志和阶级友爱。",
      source: "《中国共产党简史》"
    },
    {
      id: "ejie", no: "14", date: "1935年9月", year: "1935", title: "俄界会议",
      place: "甘肃·迭部俄界", lat: 33.95, lon: 103.20, major: false,
      lalign: "end", ldx: -15, ldy: 4,
      key: "北上",
      summary: "1935年9月12日，中共中央政治局在甘肃迭部俄界（今高吉村）召开扩大会议，通过《关于张国焘同志的错误的决定》，确定红军继续北上的战略方针。",
      sig: "俄界会议坚持了北上抗日的正确方向，维护了党和红军的团结统一。",
      source: "《中国共产党简史》；甘肃党史资料"
    },
    {
      id: "lazikou", no: "15", date: "1935年9月", year: "1935", title: "腊子口战役",
      place: "甘肃·迭部腊子口", lat: 34.10, lon: 103.60, major: true,
      lalign: "end", ldx: -16, ldy: -6,
      key: "天险",
      summary: "1935年9月17日，红军攻克甘川交界的天然屏障腊子口，打开了红军北上甘南、进军陕北的通道。",
      sig: "腊子口战役是长征中著名的以弱胜强的攻坚战，为红军顺利进入甘南、实现北上创造了条件。",
      source: "《中国共产党简史》；甘肃党史资料"
    },
    {
      id: "hadapu", no: "16", date: "1935年9月", year: "1935", title: "哈达铺决策",
      place: "甘肃·宕昌哈达铺", lat: 34.22, lon: 104.39, major: true,
      lalign: "start", ldx: 16, ldy: -2,
      key: "定向",
      summary: "1935年9月18日，红军到达哈达铺。部队从当地报纸上得知陕北有红军和根据地。9月22日，中央在此召开会议，决定“到陕北去”，并将部队改编为陕甘支队。",
      sig: "哈达铺被称为红军长征途中的“加油站”。在这里，党中央作出了落脚陕北的重要决策。",
      source: "《中国共产党简史》；哈达铺红军长征纪念馆"
    },
    {
      id: "wuqi", no: "17", date: "1935年10月", year: "1935", title: "吴起镇会师",
      place: "陕西·吴起", lat: 36.93, lon: 108.18, major: true,
      lalign: "end", ldx: -16, ldy: 2,
      key: "落脚",
      summary: "1935年10月19日，中央红军到达陕北吴起镇，与红十五军团会合，历时一年的中央红军长征胜利结束。",
      sig: "中央红军到达陕北，为中国革命找到了新的落脚点和出发点。",
      source: "《中国共产党简史》"
    },
    {
      id: "huining", no: "18", date: "1936年10月", year: "1936", title: "会宁会师",
      place: "甘肃·会宁", lat: 35.69, lon: 105.05, major: true, type: "meet",
      lalign: "end", ldx: -12, ldy: 12,
      key: "会师",
      summary: "1936年10月9日，红一方面军与红四方面军在甘肃会宁会师。会宁会师是红军三大主力会师的重要组成部分。",
      sig: "会宁是红军三大主力会师地之一，在中国革命史上具有重要意义。",
      image: "assets/images/h3.jpg",
      imageNote: "长征胜利主题插画（原项目素材，非史实照片）",
      source: "《中国共产党简史》；会宁红军会师旧址"
    },
    {
      id: "jiangtaibao", no: "19", date: "1936年10月", year: "1936", title: "将台堡会师",
      place: "宁夏·西吉将台堡", lat: 35.87, lon: 105.72, major: true, type: "meet",
      lalign: "start", ldx: 13, ldy: 16,
      key: "胜利",
      summary: "1936年10月22日，红一方面军与红二方面军在将台堡会师。至此，红军三大主力胜利会师，长征胜利结束。",
      sig: "三大主力红军会师，标志着红军长征的胜利结束，中国革命的力量在西北集结。",
      source: "《中国共产党简史》；将台堡红军长征会师纪念园"
    },
    {
      id: "shanchengbao", no: "20", date: "1936年11月", year: "1936", title: "山城堡战役",
      place: "甘肃·环县山城堡", lat: 36.80, lon: 107.06, major: false, type: "meet",
      lalign: "end", ldx: -14, ldy: -6,
      key: "尾声",
      summary: "1936年11月，红军三大主力协同作战，在甘肃环县山城堡地区取得山城堡战役胜利。",
      sig: "山城堡战役是红军长征后的最后一战，对稳定陕甘宁根据地、促进抗日民族统一战线的形成具有重要意义。",
      source: "《中国共产党简史》"
    }
  ];

  /* 重要节点配图：原有站内素材作离线备用，远程权威图带原始出处。 */
  var archives = {
    "yudu": {
        "desc": "于都长征出发地纪念园",
        "kind": "纪念遗址实拍",
        "source": "https://www.yudu.gov.cn/yudu/tsyd/201710/9ce670015cf241fb9d21d3e694bf1e33.shtml",
        "url": "https://www.yudu.gov.cn/yudu/tsyd/201710/9ce670015cf241fb9d21d3e694bf1e33/images/37edc7797afc4faca327feac402ba845.jpg"
    },
    "xiangjiang": {
        "desc": "湘江战役纪念园展厅史照墙",
        "kind": "纪念馆展陈照片",
        "source": "https://www.gxjjw.gov.cn/staticpages/20240102/gxjjw6593df4b-187293.shtml",
        "url": "https://www.gxjjw.gov.cn/data/images/uploadpic/2024/01/02/353025d1770fa3ee2b5f2d8e5b0f181b.jpg"
    },
    "tongdao": {
        "desc": "黎平会议纪念馆",
        "kind": "纪念馆实拍",
        "source": "https://gz.people.com.cn/n2/2026/0702/c371756-41627974.html",
        "url": "https://gz.people.com.cn/NMediaFile/2026/0702/LOCAL1782987547507CF2BLEMS0E.jpg"
    },
    "zunyi": {
        "desc": "遵义会议会议室旧址",
        "kind": "会议旧址照片",
        "source": "https://www.12371.cn/2021/04/12/ARTI1618196978218984.shtml",
        "url": "https://p3.img.cctvpic.com/photoworkspace/contentimg/2021/04/12/2021041211093814281.jpg"
    },
    "chishui": {
        "desc": "四渡赤水战役路线示意图",
        "kind": "历史战役示意图",
        "source": "https://www.gzrd.gov.cn/ztzl/dsxxjyzt/dszdgz/202102/t20210220_77665199.html",
        "url": "https://www.gzrd.gov.cn/ztzl/dsxxjyzt/dszdgz/202102/W020221221466460000536.jpg"
    },
    "jinshajiang": {
        "desc": "金沙江皎平渡口遗址",
        "kind": "渡口旧址实拍",
        "source": "https://www.12371.cn/2023/08/20/ARTI1692495372136387.shtml",
        "url": "https://p2.img.cctvpic.com/photoworkspace/contentimg/2023/08/20/2023082009361235162.png"
    },
    "luding": {
        "desc": "泸定桥历史照片",
        "kind": "历史影像资料",
        "source": "https://www.xinhuanet.com/politics/2016-08/23/c_1119438272.htm",
        "url": "https://www.xinhuanet.com/politics/2016-08/23/1119438272_14719531982491n.jpg"
    },
    "jiajinshan": {
        "desc": "红军翻越夹金山主题资料影像",
        "kind": "雪山行军资料照片",
        "source": "https://news.sina.com.cn/c/2016-10-11/doc-ifxwrapv1304923.shtml",
        "url": "https://n.sinaimg.cn/translate/20161011/uboQ-fxwrhpq6323942.jpg"
    },
    "caodi": {
        "desc": "红军过草地纪念碑",
        "kind": "纪念遗址实拍",
        "source": "https://www.sohu.com/a/714281282_267106",
        "url": "https://p8.itc.cn/q_70/images03/20230823/f09139c58cf14660ad4712c89f94148f.jpeg"
    },
    "lazikou": {
        "desc": "俄界会议纪念地",
        "kind": "会议纪念地实拍",
        "source": "https://www.thepaper.cn/newsDetail_forward_13258625",
        "url": "https://imagepphcloud.thepaper.cn/pph/image/138/648/529.jpg"
    },
    "wuqi": {
        "desc": "吴起镇中央红军长征胜利纪念园",
        "kind": "胜利纪念园实拍",
        "source": "https://k.sina.com.cn/article_1644674721_6207bea100100ldvm.html",
        "url": "https://n.sinaimg.cn/sinacn10116/69/w1024h645/20191109/ed94-iieqapt0400321.jpg"
    },
    "huining": {
        "desc": "会宁红军会师门",
        "kind": "会师旧址实拍",
        "source": "https://xww.bucea.edu.cn/tgx/8116e6d02091447cb7efea320751b011.htm",
        "url": "https://xww.bucea.edu.cn/images/2023-08/65c05067f08848adba3dfeb23b420437.jpeg"
    }
};
  events.forEach(function(e) {
    var a=archives[e.id];
    if(!a) return;
    e.image = "assets/images/timeline/" + e.id + ".jpg";
    e.imageNote = a.desc + " · " + a.kind;
    e.photoUrl = a.url;
    e.photoSource = a.source;
  });

  /* ------------------------------ 二、长征历史主线（时间轴） ------------------------------ */
  var timeline = [
    {
      date: "1934.10", title: "中央红军开始长征", place: "江西于都",
      text: "中央红军主力从中央革命根据地出发，开始战略转移。10月中下旬，红军渡过于都河，踏上漫漫征途。",
      key: true
    },
    {
      date: "1934.11—12", title: "湘江战役", place: "广西全州、兴安",
      text: "红军血战湘江，突破第四道封锁线，付出极其惨重的代价。中央红军由8.6万余人减至3万余人。",
      key: true
    },
    {
      date: "1934.12", title: "通道转兵与黎平、猴场会议", place: "湖南通道 / 贵州黎平、瓮安",
      text: "红军放弃北上湘西的原定计划，改向贵州前进；黎平会议、猴场会议为遵义会议的召开作了重要准备。"
    },
    {
      date: "1935.01", title: "遵义会议", place: "贵州遵义",
      text: "中共中央政治局扩大会议纠正“左”倾教条主义的军事错误，确立毛泽东在党中央和红军的领导地位，成为生死攸关的转折点。",
      key: true,
      image: "assets/images/ghlc/zyhy.png",
      imageNote: "遵义会议题材油画"
    },
    {
      date: "1935.01—03", title: "四渡赤水", place: "川黔滇交界",
      text: "红军四次渡过赤水河，声东击西、灵活机动，摆脱了几十万国民党军的围追堵截。",
      key: true
    },
    {
      date: "1935.05", title: "巧渡金沙江", place: "云南禄劝皎平渡",
      text: "红军用7条小船，历时9天9夜渡过金沙江，跳出了敌人的包围圈。",
      key: true
    },
    {
      date: "1935.05", title: "强渡大渡河 · 飞夺泸定桥", place: "四川石棉、泸定",
      text: "17名勇士强渡大渡河，22名突击队员攀踏铁索夺占泸定桥，为红军北上打开通道。",
      key: true
    },
    {
      date: "1935.06", title: "翻越夹金山 · 懋功会师", place: "四川宝兴、小金",
      text: "红军翻越长征途中第一座大雪山，随后红一方面军与红四方面军在懋功会师。"
    },
    {
      date: "1935.08", title: "穿越草地", place: "四川松潘草地",
      text: "红军进入茫茫水草地，沼泽遍布、粮食匮乏，许多战士牺牲在这片荒原上。",
      key: true
    },
    {
      date: "1935.09", title: "俄界会议 · 腊子口战役 · 哈达铺决策", place: "甘肃迭部、宕昌",
      text: "红军坚持北上方针，攻克天险腊子口，在哈达铺得知陕北有红军和根据地，作出“到陕北去”的决策。",
      key: true
    },
    {
      date: "1935.10", title: "中央红军到达陕北", place: "陕西吴起",
      text: "中央红军到达吴起镇，与红十五军团会合，历时一年的中央红军长征胜利结束。",
      key: true
    },
    {
      date: "1936.10", title: "三大主力红军胜利会师", place: "甘肃会宁 / 宁夏西吉将台堡",
      text: "1936年10月9日红一、红四方面军在会宁会师，10月22日红一、红二方面军在将台堡会师，长征胜利结束。",
      key: true
    }
  ];

  /* ------------------------------ 三、长征人物档案 ------------------------------ */
  var figures = [
    {
      id: "maozedong", no: "LM-01", name: "毛泽东", years: "1893—1976", glyph: "毛",
      role: "中央政治局委员、红军主要领导人", tag: "领袖", cat: "leader",
      facts: [
        ["籍贯", "湖南湘潭"],
        ["长征身份", "中央政治局委员"],
        ["关键节点", "遵义会议、四渡赤水"],
        ["到达陕北", "1935年10月"]
      ],
      story: "1935年1月遵义会议后，毛泽东进入党中央领导核心，参与指挥四渡赤水、巧渡金沙江等行动。在党和红军面临生死存亡的关头，他以灵活机动的战略战术，带领中央红军摆脱重围，北上陕北。",
      source: "《中国共产党简史》；《毛泽东年谱》",
      mediaTitle: "遵义会议与四渡赤水", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "zunyi",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "zhouenlai", no: "LM-02", name: "周恩来", years: "1898—1976", glyph: "周",
      role: "中央政治局常委、中革军委副主席", tag: "领袖", cat: "leader",
      facts: [
        ["籍贯", "江苏淮安"],
        ["长征身份", "中央政治局常委"],
        ["关键节点", "遵义会议、西安事变前统战工作"],
        ["到达陕北", "1935年10月"]
      ],
      story: "长征中，周恩来参与党中央的重大决策，协助毛泽东指挥红军作战，并负责与国民党地方实力派的联络和统战工作。遵义会议上，他支持毛泽东的正确主张，为会议实现伟大转折发挥了重要作用。",
      source: "《中国共产党简史》；《周恩来传》",
      mediaTitle: "遵义会议：伟大转折", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "zunyi",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "zhude", no: "LM-03", name: "朱德", years: "1886—1976", glyph: "朱",
      role: "红军总司令", tag: "领袖", cat: "leader",
      facts: [
        ["籍贯", "四川仪陇"],
        ["长征身份", "红军总司令"],
        ["关键节点", "反对张国焘分裂、坚持北上"],
        ["到达陕北", "1936年10月"]
      ],
      story: "长征中，朱德始终维护党和红军的团结统一。在红四方面军期间，他与张国焘的分裂主义错误进行了坚决斗争，坚持北上抗日的正确方针，为三大主力红军最终会师作出了重要贡献。",
      source: "《中国共产党简史》；《朱德传》",
      mediaTitle: "三大主力胜利会师", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "huining",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "liubocheng", no: "LM-04", name: "刘伯承", years: "1892—1986", glyph: "刘",
      role: "红军总参谋长", tag: "将领", cat: "general",
      facts: [
        ["籍贯", "四川开县（今重庆开州）"],
        ["长征身份", "红军总参谋长"],
        ["关键节点", "彝海结盟、强渡大渡河"],
        ["到达陕北", "1935年10月"]
      ],
      story: "1935年5月，刘伯承率部进入彝族聚居区，与彝族果基家支首领小叶丹在彝海边歃血为盟，使红军顺利通过彝区；随后参与指挥强渡大渡河，为红军打开了北上通道。",
      source: "《中国共产党简史》；《刘伯承传》",
      mediaTitle: "彝海结盟与强渡大渡河", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "anshunchang",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "pengdehuai", no: "LM-05", name: "彭德怀", years: "1898—1974", glyph: "彭",
      role: "红三军团军团长", tag: "将领", cat: "general",
      facts: [
        ["籍贯", "湖南湘潭"],
        ["长征身份", "红三军团军团长"],
        ["关键节点", "湘江战役、娄山关战斗"],
        ["到达陕北", "1935年10月"]
      ],
      story: "长征中，彭德怀率红三军团参加湘江战役、攻占娄山关、穿越草地等重要战斗和行动，是中央红军的主要战将之一。毛泽东曾以“谁敢横刀立马？唯我彭大将军”称赞其战功。",
      source: "《中国共产党简史》；《彭德怀自述》",
      mediaTitle: "长征中的红三军团", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "xiangjiang",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "xuxiangqian", no: "LM-06", name: "徐向前", years: "1901—1990", glyph: "徐",
      role: "红四方面军总指挥", tag: "将领", cat: "general",
      facts: [
        ["籍贯", "山西五台"],
        ["长征身份", "红四方面军总指挥"],
        ["关键节点", "懋功会师、会宁会师"],
        ["到达会宁", "1936年10月"]
      ],
      story: "徐向前率红四方面军参加长征，1935年6月在懋功与红一方面军会师。1936年10月，红四方面军与红一方面军在会宁会师，为三大主力红军胜利会师作出了重要贡献。",
      source: "《中国共产党简史》；《徐向前回忆录》",
      mediaTitle: "红四方面军与大会师", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "huining",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "helong", no: "LM-07", name: "贺龙", years: "1896—1969", glyph: "贺",
      role: "红二方面军总指挥", tag: "将领", cat: "general",
      facts: [
        ["籍贯", "湖南桑植"],
        ["长征身份", "红二方面军总指挥"],
        ["关键节点", "乌蒙山回旋战、甘孜会师"],
        ["到达将台堡", "1936年10月"]
      ],
      story: "1935年11月，贺龙率红二、红六军团从湘鄂川黔根据地出发长征。1936年7月与红四方面军在甘孜会师，10月到达将台堡，与红一方面军会师。",
      source: "《中国共产党简史》；《贺龙传》",
      mediaTitle: "红二方面军长征与会师", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "jiangtaibao",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "guanxiangying", no: "LM-08", name: "关向应", years: "1902—1946", glyph: "关",
      role: "红二方面军副政治委员", tag: "将领", cat: "general",
      portrait: "assets/images/hsrw/gxy.png",
      facts: [
        ["籍贯", "辽宁大连（满族）"],
        ["长征身份", "红二方面军副政治委员"],
        ["关键节点", "与贺龙率部北上"],
        ["到达将台堡", "1936年10月"]
      ],
      story: "长征中，关向应任红二方面军副政治委员，与贺龙等率部艰苦转战，坚决反对张国焘另立中央、分裂红军的错误行为，维护了党和红军的团结。",
      source: "《中国共产党简史》；原项目人物资料",
      mediaTitle: "红二方面军长征", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "jiangtaibao",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "zhurui", no: "LM-09", name: "朱瑞", years: "1905—1948", glyph: "朱",
      role: "红一军团政治部主任", tag: "将领", cat: "general",
      portrait: "assets/images/hsrw/zr.png",
      facts: [
        ["籍贯", "江苏宿迁"],
        ["长征身份", "红一军团政治部主任"],
        ["关键节点", "随红一方面军长征"],
        ["到达陕北", "1935年10月"]
      ],
      story: "朱瑞参加红军后任红一军团政治部主任等职，随红一方面军参加长征。抗战胜利后，他致力于人民炮兵建设，1948年在辽沈战役攻克义县的战斗中牺牲。",
      source: "《中国共产党简史》；原项目人物资料",
      mediaTitle: "中央红军万里转战", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "wuqi",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "xuhaiDong", no: "LM-10", name: "徐海东", years: "1900—1970", glyph: "徐",
      role: "红二十五军军长", tag: "将领", cat: "general",
      portrait: "assets/images/figures/xuhaidong.jpg",
      facts: [
        ["籍贯", "湖北黄陂（今武汉黄陂）"],
        ["长征身份", "红二十五军军长"],
        ["关键节点", "率红二十五军到达陕北"],
        ["会合", "1935年9月与陕北红军会师"]
      ],
      story: "1934年11月，徐海东率红二十五军从鄂豫皖根据地出发长征。1935年9月到达陕北，与刘志丹领导的陕北红军会合，组成红十五军团，为中央红军落脚陕北创造了有利条件。",
      source: "《中国共产党简史》；《徐海东传》",
      mediaTitle: "红二十五军到达陕北", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "wuqi",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "liuzhidan", no: "LM-11", name: "刘志丹", years: "1903—1936", glyph: "刘",
      role: "陕北红军创建人之一", tag: "英烈", cat: "martyr",
      facts: [
        ["籍贯", "陕西保安（今志丹县）"],
        ["长征身份", "陕北红军领导人"],
        ["关键节点", "创建陕甘边、陕北根据地"],
        ["牺牲", "1936年4月东征三交镇"]
      ],
      story: "刘志丹是陕甘边和陕北革命根据地的主要创建者。1935年与红二十五军会合后，为中央红军落脚陕北提供了重要依托。1936年4月，他在东征作战中于山西中阳三交镇牺牲，年仅33岁。",
      source: "《中国共产党简史》；《刘志丹传》",
      mediaTitle: "陕北根据地与红军会合", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "wuqi",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "chenshuxiang", no: "LM-12", name: "陈树湘", years: "1905—1934", glyph: "陈",
      role: "红五军团第34师师长", tag: "英烈", cat: "martyr",
      facts: [
        ["籍贯", "湖南长沙"],
        ["长征身份", "红五军团第34师师长"],
        ["关键节点", "湘江战役后卫"],
        ["牺牲", "1934年12月，年仅29岁"]
      ],
      story: "湘江战役中，陈树湘率红34师担任全军后卫，与数十倍于己的敌人鏖战，掩护主力渡过湘江。他腹部中弹重伤被俘，在押送途中用手从伤口绞断肠子，壮烈牺牲，年仅29岁。",
      source: "《中国共产党简史》；湘江战役纪念馆",
      mediaTitle: "血战湘江", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "xiangjiang",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "dengping", no: "LM-13", name: "邓萍", years: "1908—1935", glyph: "邓",
      role: "红三军团参谋长", tag: "英烈", cat: "martyr",
      facts: [
        ["籍贯", "四川富顺"],
        ["长征身份", "红三军团参谋长"],
        ["关键节点", "遵义战役"],
        ["牺牲", "1935年2月，年仅27岁"]
      ],
      story: "1935年2月，红军二渡赤水后发起遵义战役。邓萍在前线侦察敌情时中弹牺牲，年仅27岁，是长征中牺牲的红军高级将领之一。",
      source: "《中国共产党简史》；遵义会议纪念馆",
      mediaTitle: "遵义战役", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "zunyi",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "yangdezhi", no: "LM-14", name: "杨得志", years: "1911—1994", glyph: "杨",
      role: "红一军团第1团团长", tag: "勇士", cat: "brave",
      facts: [
        ["籍贯", "湖南醴陵"],
        ["长征身份", "红一军团第1团团长"],
        ["关键节点", "强渡大渡河"],
        ["到达陕北", "1935年10月"]
      ],
      story: "1935年5月，杨得志指挥红一团在安顺场强渡大渡河，17名勇士乘一条小船冒着密集火力登岸，为红军打开北上通道。",
      source: "《中国共产党简史》；《杨得志回忆录》",
      mediaTitle: "强渡大渡河", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "anshunchang",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "liaodazhu", no: "LM-15", name: "廖大珠", years: "生平待考", glyph: "廖",
      role: "红一军团第2师4团2连连长", tag: "勇士", cat: "brave",
      facts: [
        ["籍贯", "资料待考"],
        ["长征身份", "红四团2连连长"],
        ["关键节点", "飞夺泸定桥"],
        ["事迹", "22名突击队员之一"]
      ],
      story: "1935年5月29日，红四团22名突击队员冒着枪林弹雨攀踏铁索，夺占泸定桥。廖大珠是这支突击队的连长。部分红军基层指挥员的生平细节散见于回忆录，本页据公开史料收录其长征事迹。",
      source: "《中国共产党简史》；中国军网",
      mediaTitle: "飞夺泸定桥", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "luding",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    },
    {
      id: "xiaoyedan", no: "LM-16", name: "小叶丹", years: "1894—1942", glyph: "叶",
      role: "彝族果基家支首领", tag: "同行者", cat: "ally",
      facts: [
        ["籍贯", "四川冕宁彝海"],
        ["身份", "彝族果基家支首领"],
        ["关键节点", "彝海结盟"],
        ["结盟时间", "1935年5月"]
      ],
      story: "1935年5月，中央红军先遣队进入彝族区。刘伯承与果基家支首领小叶丹在彝海边歃血为盟。此后，彝族群众护送红军通过彝区，为红军抢渡大渡河赢得了宝贵时间。",
      source: "《中国共产党简史》；彝海结盟纪念馆",
      mediaTitle: "彝海结盟", mediaUrl: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", routeNode: "anshunchang",
      museumUrl: "https://www.chnmuseum.cn/zl/lszl/zdzt/202610/t20261028_283240.shtml"
    }
  ];

  /* ------------------------------ 四、知识挑战题库 ------------------------------ */
  var questions = [
    {
      q: "中央红军开始长征是在哪一年？",
      opts: ["1934年", "1935年", "1936年", "1937年"],
      a: 0,
      ex: "1934年10月，中央红军主力从中央革命根据地出发，开始战略转移。1936年10月三大主力红军会师，长征胜利结束。",
      src: "《中国共产党简史》"
    },
    {
      q: "被称为中国共产党历史上“生死攸关的转折点”的会议是？",
      opts: ["八七会议", "古田会议", "遵义会议", "瓦窑堡会议"],
      a: 2,
      ex: "1935年1月召开的遵义会议，纠正了“左”倾教条主义的军事错误，确立了毛泽东在党中央和红军的领导地位。",
      src: "《中国共产党简史》"
    },
    {
      q: "“四渡赤水”主要发生在哪一地区？",
      opts: ["湘江流域", "赤水河流域", "大渡河流域", "淮河流域"],
      a: 1,
      ex: "中央红军在川黔滇交界的赤水河两岸四次渡河，声东击西，摆脱了国民党军的围追堵截。",
      src: "《中国共产党简史》"
    },
    {
      q: "中央红军长征途中翻越的第一座大雪山是？",
      opts: ["岷山", "夹金山", "六盘山", "祁连山"],
      a: 1,
      ex: "1935年6月，中央红军翻越海拔4000多米的夹金山，这是长征途中翻越的第一座大雪山。",
      src: "《中国共产党简史》"
    },
    {
      q: "1936年10月，红一方面军与红四方面军会师于？",
      opts: ["吴起镇", "会宁", "将台堡", "甘孜"],
      a: 1,
      ex: "1936年10月9日，红一、红四方面军在甘肃会宁会师。10月22日，红一、红二方面军在将台堡会师。",
      src: "《中国共产党简史》"
    },
    {
      q: "红一方面军与红二方面军会师的地点是？",
      opts: ["会宁", "将台堡", "懋功", "甘孜"],
      a: 1,
      ex: "1936年10月22日，红一方面军与红二方面军在宁夏西吉将台堡会师，标志着三大主力红军胜利会师。",
      src: "《中国共产党简史》"
    },
    {
      q: "中央红军长征的行程约为？",
      opts: ["一万里", "二万五千里", "五万里", "十万里"],
      a: 1,
      ex: "中央红军长征历时一年，途经11个省，行程约二万五千里。",
      src: "《中国共产党简史》"
    },
    {
      q: "1935年5月，与刘伯承在彝海歃血为盟的彝族首领是？",
      opts: ["小叶丹", "阿沛·阿旺晋美", "乌兰夫", "班禅额尔德尼"],
      a: 0,
      ex: "彝族果基家支首领小叶丹与刘伯承在彝海边歃血为盟，使红军顺利通过彝区。",
      src: "《中国共产党简史》"
    },
    {
      q: "1935年9月，中央红军在甘肃哈达铺从报纸上得知的重要消息是？",
      opts: ["红军已到达陕北", "陕北有红军和根据地", "抗日战争全面爆发", "国共两党开始谈判"],
      a: 1,
      ex: "红军在哈达铺从当地报纸上得知陕北有红军和根据地，党中央随后作出“到陕北去”的重要决策。",
      src: "《中国共产党简史》；哈达铺红军长征纪念馆"
    },
    {
      q: "红军三大主力胜利会师的历史意义是？",
      opts: ["长征胜利结束", "抗日战争开始", "新中国成立", "井冈山会师"],
      a: 0,
      ex: "1936年10月，红军三大主力在会宁、将台堡胜利会师，标志着红军长征胜利结束，中国革命的力量在西北集结。",
      src: "《中国共产党简史》"
    }
  ];

  /* ------------------------------ 五、1936 / 2026 时空对话 ------------------------------ */
  var pairs = [
    {
      id: "belief", keyword: "信念", en: "FAITH",
      y1936: {
        title: "翻越雪山，向死而生",
        place: "1935年6月 · 四川夹金山",
        text: "海拔4000多米的夹金山上，空气稀薄、风雪交加。红军将士互相搀扶，用信念丈量雪线。许多人倒下了，队伍仍在向前。",
        image: "assets/images/h1.jpg",
        note: "长征雪山主题插画（非史实照片）"
      },
      y2026: {
        title: "隐姓埋名，为国铸剑",
        person: "彭士禄",
        role: "中国核潜艇第一任总设计师",
        text: "他是我国核潜艇第一任总设计师，也参与推动我国核电事业发展。数十年默默奉献，把个人理想融入国家需要。",
        image: "assets/images/portraits/psl.jpg",
        note: "人物影像来源：原项目素材"
      }
    },
    {
      id: "unity", keyword: "团结", en: "UNITY",
      y1936: {
        title: "彝海结盟，民族同心",
        place: "1935年5月 · 四川冕宁彝海",
        text: "刘伯承与彝族果基家支首领小叶丹在彝海边歃血为盟。红军模范执行党的民族政策，彝族群众护送红军顺利通过彝区。",
        image: "assets/images/h3.jpg",
        note: "长征主题插画（非史实照片）"
      },
      y2026: {
        title: "暴雨中，她把旅客请进社区",
        person: "孟二梅",
        role: "北京市门头沟区落坡岭社区党支部书记",
        text: "2023年7月，北京遭遇特大暴雨，K396次列车滞留落坡岭。孟二梅和社区居民把近千名旅客安置进社区，用互助守住平安。",
        image: "assets/images/portraits/mem.jpg",
        note: "人物影像来源：原项目素材"
      }
    },
    {
      id: "strive", keyword: "奋斗", en: "STRUGGLE",
      y1936: {
        title: "飞夺泸定桥，攀索向前",
        place: "1935年5月 · 四川泸定",
        text: "桥板被抽去，铁索悬在急流之上。22名突击队员冒着火力攀索前进，夺下泸定桥，为红军北上打开通道。",
        image: "assets/images/h2.jpg",
        note: "长征主题插画（非史实照片）"
      },
      y2026: {
        title: "把自动化码头建成世界一流",
        person: "张连钢",
        role: "山东港口青岛港自动化码头带头人",
        text: "面对技术封锁，张连钢带领团队自主攻关，建成青岛港全自动化集装箱码头，把关键核心技术掌握在自己手中。",
        image: "assets/images/portraits/zlg.jpg",
        note: "人物影像来源：原项目素材"
      }
    },
    {
      id: "duty", keyword: "担当", en: "DUTY",
      y1936: {
        title: "生死关头，独立自主作决断",
        place: "1935年1月 · 贵州遵义",
        text: "遵义会议上，中国共产党第一次独立自主地解决自己的路线、方针和政策问题，在生死关头作出改变命运的选择。",
        image: "assets/images/ghlc/zyhy.png",
        note: "遵义会议题材油画（原项目素材）"
      },
      y2026: {
        title: "守岛三十二年，把青春献给祖国",
        person: "王继才、王仕花",
        role: "江苏灌云开山岛守岛人",
        text: "1986年起，王继才、王仕花夫妇坚守开山岛32年，升旗、巡岛、记录海情，把平凡坚守写成不平凡的担当。",
        image: "assets/images/portraits/sdff.jpg",
        note: "人物影像来源：原项目素材"
      }
    },
    {
      id: "people", keyword: "为民", en: "FOR THE PEOPLE",
      y1936: {
        title: "半条被子，一条心",
        place: "1934年11月 · 湖南汝城沙洲村",
        text: "三名女红军借宿在徐解秀老人家中，临行时把仅有的一床被子剪下一半留给她。老人说：“什么是共产党？共产党就是自己有一条被子，也要剪半条给老百姓的人。”",
        plate: "半条被子",
        note: "“半条被子”故事发生地：湖南汝城沙洲村"
      },
      y2026: {
        title: "把音乐带进大山十八年",
        person: "邓小岚",
        role: "河北阜平马兰村音乐支教志愿者",
        text: "退休后，邓小岚回到曾经战斗过的马兰村，义务教孩子们音乐，组建马兰花儿童声合唱团，用歌声点亮大山孩子的童年。",
        image: "assets/images/portraits/dxl.jpg",
        note: "人物影像来源：原项目素材"
      }
    }
  ];

  var people = [
    { id: "psl", name: "彭士禄", role: "中国核潜艇第一任总设计师", text: "长期隐姓埋名投身核动力事业，把个人理想熔铸进国家重器建设。", portrait: "assets/images/portraits/psl.jpg", link: "activity.html#dialogue", ext: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", source: "新时代长征路相关影像" },
    { id: "mem", name: "孟二梅", role: "北京市门头沟区落坡岭社区党支部书记", text: "暴雨来袭时组织社区转移、安置群众与旅客，用行动诠释团结互助。", portrait: "assets/images/portraits/mem.jpg", link: "activity.html#dialogue", ext: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", source: "新时代长征路相关影像" },
    { id: "zlg", name: "张连钢", role: "山东港口青岛港自动化码头带头人", text: "面对技术封锁，坚持自主攻关，把自动化码头建设成世界级样板。", portrait: "assets/images/portraits/zlg.jpg", link: "activity.html#dialogue", ext: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", source: "新时代长征路相关影像" },
    { id: "sdff", name: "王继才、王仕花", role: "江苏灌云开山岛守岛人", text: "三十二年如一日守护海岛，在平凡岗位上写下不平凡的担当。", portrait: "assets/images/portraits/sdff.jpg", link: "activity.html#dialogue", ext: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", source: "新时代长征路相关影像" },
    { id: "dxl", name: "邓小岚", role: "河北阜平马兰村音乐支教志愿者", text: "退休后扎根大山支教十八年，用音乐点亮孩子们的童年与梦想。", portrait: "assets/images/portraits/dxl.jpg", link: "activity.html#dialogue", ext: "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml", source: "新时代长征路相关影像" }
  ];

  /* ------------------------------ 六、资料来源 ------------------------------ */
  var sources = [
    {
      title: "中央党史和文献研究院：纪念中国工农红军长征胜利90周年专题",
      desc: "长征历史、重大事件、会师节点与权威研究资料。",
      url: "https://www.dswxyjy.org.cn/GB/427277/462086/index.html"
    },
    {
      title: "中国共产党新闻网",
      desc: "党史学习教育、长征精神研究、重要会议与人物资料。",
      url: "https://cpc.people.com.cn/"
    },
    {
      title: "《中国共产党简史》",
      desc: "人民出版社2021年版，本书编写组。本站长征史实的主要依据之一。",
      url: ""
    },
    {
      title: "中国军网",
      desc: "长征战例、红军将士事迹与军史资料。",
      url: "https://www.81.cn/"
    },
    {
      title: "求是网",
      desc: "长征精神的理论阐释与新时代传承。",
      url: "https://www.qstheory.cn/"
    }
  ];

  /* ------------------------------ 七、纪念章等级 ------------------------------ */
  var badgeLevels = [
    { min: 9, name: "长征精神传承者", note: "历史了然于心，精神薪火相传" },
    { min: 7, name: "长征历史探索者", note: "沿路线读懂长征，继续前行" },
    { min: 4, name: "长征路上同行者", note: "已踏上征途，再走一段路" },
    { min: 0, name: "长征故事初读者", note: "从第一个节点开始，重新出发" }
  ];

  var figurePortraitMap = {
    chenshuxiang: "assets/images/figures/chenshuxiang.jpg",
    dengping: "assets/images/figures/dengping.jpg",
    guanxiangying: "assets/images/figures/guanxiangying.jpg",
    helong: "assets/images/figures/helong.jpg",
    liubocheng: "assets/images/figures/liubocheng.jpg",
    liuzhidan: "assets/images/figures/liuzhidan.jpg",
    maozedong: "assets/images/figures/maozedong.jpg",
    pengdehuai: "assets/images/figures/pengdehuai.jpg",
    xuhaiDong: "assets/images/figures/xuhaiDong.jpg",
    xuxiangqian: "assets/images/figures/xuxiangqian.jpg",
    yangdezhi: "assets/images/figures/yangdezhi.jpg",
    zhouenlai: "assets/images/figures/zhouenlai.jpg",
    zhude: "assets/images/figures/zhude.jpg",
    zhurui: "assets/images/figures/zhurui.jpg",
    liaodazhu: "assets/images/figures/liaodazhu.jpg",
    xiaoyedan: "assets/images/figures/xiaoyedan.jpg"
  };
  var routeNodeMap = { anshunchang: "luding", jiangtaibao: "huining" };
  figures.forEach(function (f) {
    if (figurePortraitMap[f.id]) f.portrait = figurePortraitMap[f.id];
    if (routeNodeMap[f.routeNode]) f.routeNode = routeNodeMap[f.routeNode];
    if (!f.museumUrl) f.museumUrl = "museum.html#hall";
    if (!f.mediaUrl) f.mediaUrl = "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml";
  });

  return {
    events: events,
    timeline: timeline,
    figures: figures,
    questions: questions,
    pairs: pairs,
    people: people,
    sources: sources,
    badgeLevels: badgeLevels
  };
})();
