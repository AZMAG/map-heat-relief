function getDefinitionExpression(amenities) {
  if (amenities.length === 0) {
    return "1=1";
  }

  return amenities
    .map(({ key }) => {
      return `${key} = 1`;
    })
    .join(" AND ");
}

export default getDefinitionExpression;
