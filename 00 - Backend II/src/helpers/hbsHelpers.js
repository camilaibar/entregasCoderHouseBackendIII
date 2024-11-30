const hbsHelpers = {
  capitalizeTitle: (text) => {
    if (text === "pid") return text.toUpperCase();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  completeNullable: (text) => {
    if (text === "" || text === undefined || text === null) return "-";
    return text;
  },
  multiply: (a, b) => {
    return Number(a) * Number(b);
  },
  calculateTotal: (products) => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * Number(product.quantity);
    }, 0);
  },
  json: (context) => JSON.stringify(context, null, 2),
  consoleLog: (context) => {
    console.log(context);
  },
};

export default hbsHelpers;
