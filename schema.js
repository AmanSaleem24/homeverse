// validation schema (utils/listingSchema.js)
import Joi from "joi";

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.object({
    filename: Joi.string().allow(""),
    url: Joi.string().allow(""),
  }),
});

export default listingSchema;
