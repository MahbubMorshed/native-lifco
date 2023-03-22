import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import dish from "./dish";
import category from "./category";
import featured from "./featured";
import restaurent from "./restaurent";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([dish, featured, category, restaurent]),
});
