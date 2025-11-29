export const parseAppName = (text) => {
  const match = (parts) => {
    return (
      lowercase.includes(parts.join(' ')) || lowercase.includes(parts.join('-')) || lowercase.includes(parts.join(''))
    );
  };

  const lowercase = text.toLowerCase();

  if (match(['газпром', 'банк'])) {
    return 'Газпромбанк';
  }
  if (match(['почта', 'банк'])) {
    return 'Почта Банк';
  }
  if (match(['совком', 'банк'])) {
    return 'Халва – Совкомбанк';
  }

  if (match(['сбер', 'мобайл'])) {
    return 'СберМобайл';
  }
  if (match(['сбер', 'инвестиции'])) {
    return 'СберИнвестиции';
  }
  if (match(['сбер', 'бизнес'])) {
    return 'СберБизнес';
  }
  if (match(['сбер'])) {
    return 'Сбер';
  }
  if (match(['гига', 'чат']) || match(['giga', 'chat'])) {
    return 'GigaChat';
  }

  if (match(['рокетбанк'])) {
    return 'Рокетбанк';
  }
  if (match(['т', 'банк'])) {
    return 'Т-Банк';
  }
  if (match(['т', 'инвестиции'])) {
    return 'Т-Инвестиции';
  }
  if (match(['альфа', 'банк'])) {
    return 'Альфа-Банк';
  }
  if (match(['альфа', 'инвестиции'])) {
    return 'Альфа-Инвестиции';
  }

  if (match(['ural', 'сиб']) || match(['урал', 'сиб'])) {
    return 'Уралсиб Онлайн';
  }
  if (match(['новиком'])) {
    return 'НОВИКОМ';
  }
  if (match(['бкс', 'банк'])) {
    return 'БКС Банк';
  }
  if (match(['мтс', 'деньги']) || match(['экси', 'банк'])) {
    return 'МТС Деньги';
  }
  if (match(['юмани'])) {
    return 'ЮMoney';
  }
  if (match(['дом', 'клик'])) {
    return 'Домклик';
  }

  if (match(['бспб'])) {
    return 'БСПБ';
  }
  if (match(['псб'])) {
    return 'ПСБ';
  }

  if (match(['s7'])) {
    return 'S7 Airlines';
  }
};
