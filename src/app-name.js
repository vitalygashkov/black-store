const parseAppName = (text) => {
  const match = (parts) => {
    return (
      lowercase.includes(parts.join(' ')) || lowercase.includes(parts.join('-')) || lowercase.includes(parts.join(''))
    );
  };

  const lowercase = text.toLowerCase();

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
    return 'Т-Банк';
  }
  if (match(['сбер', 'мобайл'])) {
    return 'СберМобайл';
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
  if (match(['сбер', 'бизнес'])) {
    return 'СберБизнес';
  }
  if (match(['псб'])) {
    return 'ПСБ';
  }
};

module.exports = { parseAppName };
