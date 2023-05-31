import { NextFunction, Request, Response } from "express";

export default function sortBy(req: Request, res: Response, next: NextFunction) {
  const sort = req.query.sort;
  let sortObj: {} = { _id: 1 };
  if (sort === "h2l") {
    sortObj = { cost: -1, _id: -1 };
  } else if (sort === "l2h") {
    sortObj = { cost: 1, _id: -1 };
  } else if (sort === "rating") {
    sortObj = { rating: -1, _id: -1 };
  }
  req.body.sort = sortObj;
  next()
}
