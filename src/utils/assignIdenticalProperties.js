export default (properties, value) => {
  let assignFunction;

  switch(true) {
    case Array.isArray(value):
      assignFunction = (acc, prop) => (
        (acc[prop] = [...value]) && acc
      );
      break;

    case typeof(value) === 'object':
      assignFunction = (acc, prop) => (
        (acc[prop] = {...value}) && acc
      );
      break;

    default:
      assignFunction = (acc, prop) => {
        acc[prop] = value;
        return acc;
      };
  }

  return properties.reduce(assignFunction, {});
}
