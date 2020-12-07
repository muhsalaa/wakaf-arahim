// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../utils/dbConnect";
import Block from "../../../models/block";
import MiniBlock from "../../../models/miniBlock";
import Muwaqif from "../../../models/muwaqif";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const blocks = await Block.find({})
          .populate("muwaqif")
          .populate({
            path: "mini_blocks",
            populate: {
              path: "muwaqif",
              model: "User",
            },
          });
        res.status(200).json({ success: true, data: blocks });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Terjadi Kesalahan, silakan refresh halaman" });
      }
      break;
    default:
      res
        .status(400)
        .json({ message: "Terjadi Kesalahan, silakan refresh halaman" });
      break;
  }
};
