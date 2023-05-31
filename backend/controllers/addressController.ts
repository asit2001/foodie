import { Request, Response } from "express";
import { Address } from "../src/type";
import AddressModel from "../models/AddressModel";
export async function addAddress(req: Request, res: Response) {
  try {
    const { address, address_type, flat_number, landmark, user_id } =
      req.body as Address;

    if (!address || !address_type || !flat_number || !landmark) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const addr = await AddressModel.create({
      address,
      address_type,
      flat_number,
      landmark,
      user_id,
    });
    res.status(200).json(addr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAddress(req: Request, res: Response) {
  try {
    const { user_id } = req.body;
    const address = await AddressModel.find({ user_id: user_id });
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function deleteAddress(req: Request, res: Response) {
  try {
    const { address_id } = req.body;
    if (!address_id) {
      return res.status(400).json({ error: "address id is missing" });
    }
    const result =  await AddressModel.findByIdAndDelete(address_id);
    if (!result) {
        return res.status(404).json({ error: "address id not found" })
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
