// ─────────────────────────────────────────────────────────────────────────────
// Указатель справочника — единственный источник структуры раздела /spravochnik/.
//
// Волна 16. Раздел перестал быть блогом: материалы разложены не лентой по дате,
// а тремя нормативными осями, как в бумажном справочнике:
//   • по ДОКУМЕНТУ        — от какой нормы материал (ФНП №461, ТР ТС 010/2011, …);
//   • по ОБЪЕКТУ НАДЗОРА  — про что он (кран, строп, канат, траверса, площадка…);
//   • по РОЛИ             — кому он адресован (крановщик, стропальщик, ответственный…).
//
// ЗАГОЛОВКИ И ОПИСАНИЯ ЗДЕСЬ НЕ ДУБЛИРУЮТСЯ. Они читаются из самих файлов
// материалов через import.meta.glob — поэтому указатель физически не может
// разойтись с содержимым страницы: переименовали материал — переименовалась и
// строка указателя. Здесь хранится только то, чего в тексте статьи нет:
// фасеты и термины предметного указателя.
// ─────────────────────────────────────────────────────────────────────────────

export type DocId =
  | 'fnp461' | 'trts010' | 'ot753' | 'ot883' | 'gost' | 'pdd'
  | 'koap' | 'gk' | 'msk' | 'passport' | 'gaz' | 'pat' | 'meddop' | 'teplo' | 'putl';

export type ObjId = 'kran' | 'strop' | 'kanat' | 'traversa' | 'ploshadka' | 'gruz' | 'seti' | 'personal' | 'dogovor';

export type RoleId = 'kranovshchik' | 'stropalshchik' | 'otv-rabot' | 'otv-soderzhanie' | 'zakazchik';

export const DOCS: { id: DocId; short: string; full: string }[] = [
  { id: 'fnp461', short: 'ФНП №461', full: 'Федеральные нормы и правила «Правила безопасности ОПО, на которых используются подъёмные сооружения» (приказ Ростехнадзора от 26.11.2020 №461)' },
  { id: 'trts010', short: 'ТР ТС 010/2011', full: 'Технический регламент Таможенного союза «О безопасности машин и оборудования»' },
  { id: 'ot753', short: 'Правила ОТ при ПРР (753н)', full: 'Правила по охране труда при погрузочно-разгрузочных работах и размещении грузов (приказ Минтруда от 28.10.2020 №753н) — документ, заменивший ПОТ РМ-007-98' },
  { id: 'ot883', short: 'Правила ОТ в строительстве (883н)', full: 'Правила по охране труда при строительстве, реконструкции и ремонте (приказ Минтруда от 11.12.2020 №883н)' },
  { id: 'gost', short: 'ГОСТ и СП', full: 'Государственные стандарты и своды правил: режимы работы, освещённость, ограждение зоны, стропы' },
  { id: 'pdd', short: 'ПДД и допуск ТС', full: 'Правила дорожного движения и Основные положения по допуску транспортных средств к эксплуатации' },
  { id: 'koap', short: 'КоАП РФ и 116-ФЗ', full: 'Кодекс об административных правонарушениях и Закон о промышленной безопасности опасных производственных объектов' },
  { id: 'gk', short: 'ГК РФ и НК РФ', full: 'Гражданский и Налоговый кодексы: аренда транспортного средства с экипажем, ответственность за груз, налоги' },
  { id: 'msk', short: 'Московские акты', full: 'Законы и постановления города Москвы: тишина, ордер ОАТИ, ПОДД, зона метрополитена, зимний регламент' },
  { id: 'passport', short: 'Паспорт и руководство ПС', full: 'Паспорт подъёмного сооружения и руководство (инструкция) по эксплуатации — норма конкретной машины' },
  { id: 'gaz', short: 'Охрана газораспределительных сетей (ПП №878)', full: 'Постановление Правительства РФ от 20.11.2000 №878 «Об утверждении Правил охраны газораспределительных сетей» — охранная зона газопровода, порядок согласования работ вблизи трубы' },
  { id: 'pat', short: 'Приаэродромная территория (ВК РФ, ПП №1460)', full: 'Статья 47 Воздушного кодекса РФ и постановление Правительства РФ от 02.12.2017 №1460 — подзоны приаэродромной территории и высотные ограничения по ФАП' },
  { id: 'meddop', short: 'Медосмотры водителя (196-ФЗ, приказ №266н)', full: 'Федеральный закон от 10.12.1995 №196-ФЗ «О безопасности дорожного движения» и приказ Минздрава России от 30.05.2023 №266н «О порядке проведения предсменных, предрейсовых и послесменных, послерейсовых медицинских осмотров» — действует с 01.09.2023, заменил приказ №835н от 15.12.2014' },
  { id: 'teplo', short: 'Охрана тепловых сетей (приказ №197)', full: 'Приказ Минстроя России от 17.08.1992 №197 «Об утверждении Типовых правил охраны коммунальных тепловых сетей» — охранная зона тепловой сети шириной не менее 3 м, порядок согласования работ вблизи трубопровода' },
  { id: 'putl', short: 'Путевые листы (259-ФЗ, приказ №390)', full: 'Федеральный закон от 08.11.2007 №259-ФЗ «Устав автомобильного транспорта и городского наземного электрического транспорта», приказ Минтранса России от 28.09.2022 №390 (обязательные реквизиты и порядок оформления путевого листа) и постановление Госкомстата России от 28.11.1997 №78 — форма №ЭСМ-2 «Путевой лист строительной машины»' },
];

export const OBJECTS: { id: ObjId; label: string; note: string }[] = [
  { id: 'kran', label: 'Кран', note: 'сама машина: допуск, освидетельствование, приборы безопасности, срок службы' },
  { id: 'strop', label: 'Стропы', note: 'грузозахватные приспособления: выбор, углы, браковка' },
  { id: 'kanat', label: 'Канаты', note: 'стальные канаты крана: износ и нормы браковки' },
  { id: 'traversa', label: 'Траверсы', note: 'грузозахватные устройства: испытания и периодичность осмотра' },
  { id: 'ploshadka', label: 'Площадка', note: 'место установки: грунт, уклон, котлован, ограждение, освещение' },
  { id: 'gruz', label: 'Груз', note: 'масса, взвешивание, габарит, ответственность за повреждение' },
  { id: 'seti', label: 'Сети и ЛЭП', note: 'воздушные линии, кабели, газопроводы, охранные зоны' },
  { id: 'personal', label: 'Персонал', note: 'квалификация, проверка знаний, СИЗ, сигналы' },
  { id: 'dogovor', label: 'Договор и деньги', note: 'аренда с экипажем, простой, налоги, страхование' },
];

export const ROLES: { id: RoleId; label: string; note: string }[] = [
  { id: 'kranovshchik', label: 'Крановщик (оператор ПС)', note: 'что обязан знать и когда обязан остановить подъём' },
  { id: 'stropalshchik', label: 'Стропальщик', note: 'строповка, сигналы, браковка, СИЗ' },
  { id: 'otv-rabot', label: 'Ответственный за безопасное производство работ', note: 'площадка, наряд-допуск, ППР, опасная зона' },
  { id: 'otv-soderzhanie', label: 'Ответственный за содержание ПС / производственный контроль', note: 'освидетельствование, ЭПБ, ремонт, учёт' },
  { id: 'zakazchik', label: 'Заказчик крана', note: 'что вправе спросить у подрядчика и за что отвечает сам' },
];

export type Facet = {
  docs: DocId[];
  objects: ObjId[];
  roles: RoleId[];
  /** Норма, к которой материал привязан. Точные номера пунктов проставлены
   *  только там, где они сверены по тексту документа (см. блок «Источники»
   *  на самой странице); в остальных случаях — только название документа. */
  norm: string;
  /** Термины предметного указателя: по ним материал ищется в строке поиска
   *  и попадает в буквенный указатель А–Я на главной. */
  terms: string[];
};

export const FACETS: Record<string, Facet> = {
  'akt-osvidetelstvovaniya-fundamenta': {
    docs: ['fnp461'], objects: ['ploshadka', 'kran'], roles: ['otv-rabot'],
    norm: 'ФНП №461 — установка ПС', terms: ['Акт освидетельствования скрытых работ', 'Фундамент башенного крана'],
  },
  'arenda-s-ekipazhem-i-bez': {
    docs: ['gk'], objects: ['dogovor'], roles: ['zakazchik'],
    norm: 'ГК РФ — аренда транспортного средства с экипажем', terms: ['Аренда с экипажем', 'Экипаж'],
  },
  'arenda-s-operatorom-nalogi': {
    docs: ['gk'], objects: ['dogovor'], roles: ['zakazchik'],
    norm: 'НК РФ — налоги заказчика', terms: ['Налоги при аренде техники', 'НДС в аренде крана'],
  },
  'attestaciya-kranovshchika': {
    docs: ['fnp461'], objects: ['personal'], roles: ['kranovshchik', 'zakazchik'],
    norm: 'ФНП №461 — требования к персоналу', terms: ['Аттестация крановщика', 'Удостоверение оператора ПС'],
  },
  'avtokran-ili-avtovyshka': {
    docs: ['fnp461'], objects: ['kran'], roles: ['zakazchik'],
    norm: 'ФНП №461 — виды подъёмных сооружений', terms: ['Автовышка', 'Подъёмник (вышка)'],
  },
  'beton-v-zharu-i-kran': {
    docs: ['gost'], objects: ['gruz', 'ploshadka'], roles: ['zakazchik'],
    norm: 'СП по бетонным работам — температурный режим', terms: ['Бетонирование в жару', 'Летний график смены'],
  },
  'brakovka-kanatov': {
    docs: ['fnp461'], objects: ['kanat'], roles: ['otv-soderzhanie', 'kranovshchik'],
    norm: 'ФНП №461 — браковка стальных канатов', terms: ['Браковка каната', 'Обрывы проволок', 'Износ каната'],
  },
  'deklaraciya-tr-ts-010': {
    docs: ['trts010'], objects: ['kran'], roles: ['zakazchik', 'otv-soderzhanie'],
    norm: 'ТР ТС 010/2011 — подтверждение соответствия', terms: ['Декларация соответствия', 'ТР ТС 010/2011'],
  },
  'ekspertiza-promyshlennoy-bezopasnosti': {
    docs: ['fnp461', 'koap'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: 'ФНП №461 — экспертиза промышленной безопасности', terms: ['Экспертиза промышленной безопасности', 'ЭПБ'],
  },
  'ezhegodnaya-proverka-znaniy': {
    docs: ['fnp461'], objects: ['personal'], roles: ['kranovshchik', 'stropalshchik'],
    norm: 'ФНП №461 — проверка знаний персонала', terms: ['Проверка знаний', 'Периодическая аттестация'],
  },
  'flat-top-bashennyy-kran': {
    docs: ['passport'], objects: ['kran'], roles: ['zakazchik'],
    norm: 'Руководство по эксплуатации башенного крана', terms: ['Безоголовочный кран', 'Flat top', 'Башенный кран'],
  },
  'fnp-461-chto-izmenilos': {
    docs: ['fnp461'], objects: ['kran'], roles: ['zakazchik', 'otv-soderzhanie'],
    norm: 'ФНП №461 — общий разбор документа', terms: ['ФНП №461', 'ПБ 10-382-00'],
  },
  'kran-i-priaerodromnaya-territoriya': {
    docs: ['pat'], objects: ['ploshadka', 'kran'], roles: ['zakazchik', 'otv-rabot'],
    norm: 'ст. 47 ВК РФ, ПП РФ №1460 — 3-я и 4-я подзоны ПАТ', terms: ['Приаэродромная территория', 'Высотное ограничение крана', 'ЗОУИТ'],
  },
  'gruppa-rezhima-krana': {
    docs: ['gost', 'passport'], objects: ['kran'], roles: ['zakazchik'],
    norm: 'ГОСТ — классификация режимов работы', terms: ['Группа режима работы', 'Класс использования А1–А8'],
  },
  'gruzovysotnaya-harakteristika': {
    docs: ['passport'], objects: ['kran', 'gruz'], roles: ['zakazchik', 'kranovshchik'],
    norm: 'Паспорт ПС — грузовая характеристика', terms: ['Грузовысотная характеристика', 'Вылет стрелы'],
  },
  'gusyok-udlinitel-strely': {
    docs: ['passport'], objects: ['kran'], roles: ['kranovshchik', 'zakazchik'],
    norm: 'Руководство по эксплуатации — сменное оборудование', terms: ['Гусёк', 'Удлинитель стрелы'],
  },
  'konczevye-vyklyuchateli': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: 'ФНП №461 — приборы и устройства безопасности', terms: ['Концевой выключатель', 'Приборы безопасности'],
  },
  'markirovka-negabarita-pri-transportirovke': {
    docs: ['pdd'], objects: ['gruz'], roles: ['zakazchik'],
    norm: 'ПДД РФ, раздел 23; Основные положения по допуску ТС, п. 8', terms: ['Крупногабаритный груз', 'Опознавательный знак'],
  },
  'massa-tary-vzveshivanie': {
    docs: ['ot753'], objects: ['gruz'], roles: ['stropalshchik', 'zakazchik'],
    norm: 'Правила ОТ при ПРР — масса груза до подъёма', terms: ['Масса груза', 'Взвешивание', 'Масса тары'],
  },
  'modernizaciya-i-epb': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: 'ФНП №461 — реконструкция и модернизация ПС', terms: ['Модернизация крана', 'Реконструкция ПС'],
  },
  'neispravnost-krana-na-obekte': {
    docs: ['fnp461'], objects: ['kran'], roles: ['kranovshchik', 'otv-soderzhanie'],
    norm: 'ФНП №461 — вывод ПС из работы', terms: ['Неисправность крана', 'Остановка работ'],
  },
  'nesushchaya-sposobnost-grunta': {
    docs: ['fnp461'], objects: ['ploshadka'], roles: ['otv-rabot'],
    norm: 'ФНП №461, п. 108 и п. 110 — площадка и выносные опоры', terms: ['Несущая способность грунта', 'Выносные опоры', 'Подкладки под опоры'],
  },
  'ogranichitel-gruzopodemnosti': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie', 'kranovshchik'],
    norm: 'ФНП №461 — ограничитель грузоподъёмности', terms: ['Ограничитель грузоподъёмности', 'ОГП'],
  },
  'opasnaya-zona-krana': {
    docs: ['gost', 'ot883'], objects: ['ploshadka'], roles: ['otv-rabot'],
    norm: 'Правила ОТ в строительстве; ГОСТ по ограждениям', terms: ['Опасная зона', 'Ограждение площадки', 'Знаки безопасности'],
  },
  'osveshchenie-ploshchadki': {
    docs: ['gost'], objects: ['ploshadka'], roles: ['otv-rabot'],
    norm: 'ГОСТ 12.1.046-2014, таблица 2', terms: ['Освещённость площадки', 'Люксы на крюке'],
  },
  'otvetstvennost-za-padenie-gruza': {
    docs: ['gk'], objects: ['gruz', 'dogovor'], roles: ['zakazchik'],
    norm: 'ГК РФ — ответственность сторон', terms: ['Повреждение груза', 'Ответственность за груз'],
  },
  'otvetstvennyy-za-bezopasnoe-proizvodstvo': {
    docs: ['fnp461'], objects: ['personal'], roles: ['otv-rabot'],
    norm: 'ФНП №461 — специалисты эксплуатирующей организации', terms: ['Ответственный за безопасное производство работ', 'Приказ о назначении'],
  },
  'pasport-krana': {
    docs: ['fnp461', 'trts010', 'passport'], objects: ['kran'], roles: ['zakazchik', 'otv-soderzhanie'],
    norm: 'ФНП №461, п. 189 — записи в паспорте ПС', terms: ['Паспорт крана', 'Паспорт ПС'],
  },
  'pot-rm-007-98': {
    docs: ['ot753'], objects: ['gruz', 'ploshadka'], roles: ['stropalshchik', 'kranovshchik'],
    norm: 'ПОТ РМ-007-98 прекратил действие → приказ Минтруда №753н', terms: ['ПОТ РМ-007-98', 'Погрузочно-разгрузочные работы', 'Приказ 753н'],
  },
  'povrezhdenie-kabelya-na-obekte': {
    docs: ['koap'], objects: ['seti'], roles: ['otv-rabot'],
    norm: 'Правила охраны электрических сетей — охранная зона кабеля', terms: ['Повреждение кабеля', 'Охранная зона сетей'],
  },
  'predreysovyy-medosmotr-voditelya': {
    docs: ['meddop'], objects: ['personal'], roles: ['kranovshchik', 'zakazchik'],
    norm: '196-ФЗ, ст. 20/23; приказ Минздрава №266н — действует с 01.09.2023', terms: ['Предрейсовый медицинский осмотр', 'Приказ №266н', 'Медосмотр водителя'],
  },
  'ppr-dlya-krana': {
    docs: ['fnp461'], objects: ['ploshadka'], roles: ['otv-rabot'],
    norm: 'ФНП №461 — ППР и технологические карты', terms: ['ППР', 'Проект производства работ', 'Технологическая карта'],
  },
  'ppr-vs-kapremont-krana': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: 'ФНП №461 — ремонт ПС', terms: ['Капитальный ремонт крана', 'ППР (планово-предупредительный ремонт)'],
  },
  'prostoy-tehniki-oplata': {
    docs: ['gk'], objects: ['dogovor'], roles: ['zakazchik'],
    norm: 'ГК РФ — исполнение обязательств по договору аренды', terms: ['Простой техники', 'Оплата простоя'],
  },
  'rabota-krana-ryadom-s-lep': {
    docs: ['fnp461'], objects: ['seti'], roles: ['otv-rabot', 'kranovshchik'],
    norm: 'ФНП №461, п. 112 — 30 м, наряд-допуск', terms: ['Наряд-допуск', 'ЛЭП', 'Охранная зона ВЛ', '30 метров'],
  },
  'rabota-krana-ryadom-s-gazoprovodom': {
    docs: ['gaz'], objects: ['seti', 'ploshadka'], roles: ['otv-rabot', 'zakazchik'],
    norm: 'ПП РФ №878, п. 7 и п. 14 — охранная зона газопровода', terms: ['Охранная зона газопровода', 'Мосгаз', 'Земляные работы у газопровода'],
  },
  'rabota-krana-ryadom-s-teplotrassoy': {
    docs: ['teplo'], objects: ['seti', 'ploshadka'], roles: ['otv-rabot', 'zakazchik'],
    norm: 'Приказ Минстроя России №197 от 17.08.1992 — охранная зона тепловой сети не менее 3 м', terms: ['Охранная зона теплотрассы', 'МОЭК', 'Гидравлические испытания тепловых сетей'],
  },
  'rabota-krana-zimoy': {
    docs: ['msk'], objects: ['ploshadka'], roles: ['zakazchik'],
    norm: 'Московские акты и ГОСТ 12.1.046-2014 — зимняя смена', terms: ['Зимняя смена', 'Гололёд на площадке', 'Световой день'],
  },
  'rasstoyanie-ot-kotlovana': {
    docs: ['fnp461'], objects: ['ploshadka'], roles: ['otv-rabot'],
    norm: 'ФНП №461, п. 111 и приложение №1', terms: ['Расстояние до котлована', 'Откос', 'Траншея'],
  },
  'registraciya-krana-rostehnadzor': {
    docs: ['koap', 'fnp461'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: '116-ФЗ и ФНП №461 — реестр ОПО', terms: ['Реестр ОПО', 'Регистрация крана', 'Ростехнадзор'],
  },
  'remont-strely-posle-avarii-dopusk': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: 'ФНП №461 — ремонт металлоконструкций и допуск в работу', terms: ['Ремонт стрелы', 'Допуск после ремонта'],
  },
  'signaly-stropalshchika': {
    docs: ['fnp461'], objects: ['personal'], roles: ['stropalshchik', 'kranovshchik'],
    norm: 'ФНП №461 — знаковая сигнализация', terms: ['Сигналы стропальщика', 'Знаковая сигнализация'],
  },
  'siz-stropalshchika-kranovshchika': {
    docs: ['ot753'], objects: ['personal'], roles: ['stropalshchik', 'kranovshchik'],
    norm: 'Правила ОТ и нормы выдачи СИЗ', terms: ['СИЗ', 'Каска', 'Сигнальный жилет'],
  },
  'soglasovanie-perekrytiya-proezda': {
    docs: ['msk'], objects: ['ploshadka'], roles: ['zakazchik', 'otv-rabot'],
    norm: 'Постановление Правительства Москвы №299-ПП; ПОДД', terms: ['Перекрытие проезда', 'ОАТИ', 'ПОДД', 'Ордер'],
  },
  'srok-sluzhby-krana': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: 'ФНП №461 — истечение срока службы ПС', terms: ['Срок службы крана', 'Продление ресурса'],
  },
  'strahovanie-otvetstvennosti-opo': {
    docs: ['koap'], objects: ['kran', 'dogovor'], roles: ['zakazchik'],
    norm: '225-ФЗ — обязательное страхование ответственности владельца ОПО', terms: ['Страхование ОПО', 'ОСОПО'],
  },
  'takelazh-ili-arenda-krana': {
    docs: ['gk'], objects: ['gruz', 'dogovor'], roles: ['zakazchik'],
    norm: 'Договорная граница услуги: такелаж и аренда', terms: ['Такелажные работы', 'Такелаж'],
  },
  'tehnicheskoe-diagnostirovanie': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie'],
    norm: 'ФНП №461 — техническое диагностирование', terms: ['Техническое диагностирование', 'Неразрушающий контроль'],
  },
  'tehnicheskoe-osvidetelstvovanie-krana': {
    docs: ['fnp461'], objects: ['kran'], roles: ['otv-soderzhanie', 'zakazchik'],
    norm: 'ФНП №461, п. 165–189 — частичное 12 мес., полное 3 года', terms: ['Техническое освидетельствование', 'ЧТО и ПТО', 'Статические испытания', 'Динамические испытания'],
  },
  'tekstilnye-stropy': {
    docs: ['gost'], objects: ['strop'], roles: ['stropalshchik'],
    norm: 'ГОСТ на текстильные и канатные стропы', terms: ['Текстильный строп', 'Канатный строп'],
  },
  'traversy-ispytaniya': {
    docs: ['fnp461'], objects: ['traversa'], roles: ['stropalshchik', 'otv-soderzhanie'],
    norm: 'ФНП №461 — грузозахватные приспособления', terms: ['Траверса', 'Испытание траверсы'],
  },
  'trebovaniya-k-stropalshchiku': {
    docs: ['fnp461'], objects: ['strop', 'personal'], roles: ['stropalshchik'],
    norm: 'ФНП №461 — требования к стропальщику и стропам', terms: ['Стропальщик', 'Осмотр строп'],
  },
  'ugol-naklona-stropa': {
    docs: ['gost'], objects: ['strop'], roles: ['stropalshchik'],
    norm: 'Схемы строповки — влияние угла на натяжение ветви', terms: ['Угол наклона стропа', 'Ветвь стропа'],
  },
  'ustoychivost-krana': {
    docs: ['fnp461', 'gost'], objects: ['kran'], roles: ['kranovshchik', 'otv-rabot'],
    norm: 'ФНП №461 и ГОСТ — запас устойчивости', terms: ['Устойчивость крана', 'Опрокидывание', 'Коэффициент запаса'],
  },
  'putevoy-list-avtokrana': {
    docs: ['putl'], objects: ['dogovor'], roles: ['zakazchik'],
    norm: '259-ФЗ, ст. 6 и приказ Минтранса №390 от 28.09.2022 — реквизиты путевого листа', terms: ['Путевой лист автокрана', 'Форма ЭСМ-2', 'Машино-часы'],
  },
};

export type Entry = {
  slug: string;
  title: string;
  description: string;
  url: string;
} & Facet;

const raws = import.meta.glob<string>('../pages/spravochnik/*/index.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Все материалы справочника: заголовок и описание — из самих файлов, фасеты — отсюда. */
export const ENTRIES: Entry[] = Object.entries(raws)
  .map(([file, raw]) => {
    const slug = file.match(/spravochnik\/([^/]+)\/index\.astro$/)?.[1] ?? '';
    const title = raw.match(/const\s+title\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? '';
    const description = raw.match(/const\s+description\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? '';
    const facet = FACETS[slug];
    if (!slug || !title || !facet) return null;
    return { slug, title, description, url: `/spravochnik/${slug}/`, ...facet };
  })
  .filter((e): e is Entry => e !== null)
  .sort((a, b) => a.title.localeCompare(b.title, 'ru'));

/** Материалы, попавшие в справочник, но не описанные фасетами, — это дефект
 *  указателя: материал существует, а найти его по нормам нельзя. Ломаем сборку. */
const missing = Object.keys(raws)
  .map((f) => f.match(/spravochnik\/([^/]+)\/index\.astro$/)?.[1] ?? '')
  .filter((s) => s && !FACETS[s]);
if (missing.length) {
  throw new Error(
    'Указатель справочника неполон — нет фасетов для: ' + missing.join(', ') +
    '. Добавьте запись в FACETS (src/lib/spravochnik.ts), иначе материал выпадет из указателя.'
  );
}

export const byDoc = (id: DocId) => ENTRIES.filter((e) => e.docs.includes(id));
export const byObject = (id: ObjId) => ENTRIES.filter((e) => e.objects.includes(id));
export const byRole = (id: RoleId) => ENTRIES.filter((e) => e.roles.includes(id));

/** Предметный указатель А–Я: термин → материал. Русская буква берётся из термина. */
export type TermRef = { term: string; url: string; title: string };
export const TERMS: TermRef[] = ENTRIES
  .flatMap((e) => e.terms.map((t) => ({ term: t, url: e.url, title: e.title })))
  .sort((a, b) => a.term.localeCompare(b.term, 'ru'));

export const TERM_LETTERS: { letter: string; items: TermRef[] }[] = (() => {
  const map = new Map<string, TermRef[]>();
  for (const t of TERMS) {
    // Термины, начинающиеся с цифры («30 метров»), собираются в группу «0–9»,
    // как в бумажном указателе: буква «3» перед «А» читается как опечатка.
    const first = t.term[0];
    const letter = /[0-9]/.test(first) ? '0–9' : first.toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(t);
  }
  return [...map.entries()]
    .sort((a, b) => {
      // Порядок: цифры → кириллица → латиница. localeCompare('ru') сам по себе
      // ставит латиницу после кириллицы, но цифры трактует непредсказуемо.
      const rank = (s: string) => (s === '0–9' ? 0 : /[А-ЯЁ]/.test(s) ? 1 : 2);
      const d = rank(a[0]) - rank(b[0]);
      return d !== 0 ? d : a[0].localeCompare(b[0], 'ru');
    })
    .map(([letter, items]) => ({ letter, items }));
})();
