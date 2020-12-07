// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../utils/dbConnect";
import Block from "../../../models/block";
import MiniBlock from "../../../models/miniBlock";
import Muwaqif from "../../../models/muwaqif";
import Statistic from "../../../models/statistic";

function getSlice(arr, available, wide) {
  const temp = [...arr];
  const start = (1 - available) * 4;
  const end = wide * 4 + start;
  return temp.slice(start, end);
}

function createMiniBlock(wide, id) {
  const tail = [...Array((1 - wide) * 4).fill({ status: "available" })];
  const head = [...Array(wide * 4).fill({ status: "reserved", muwaqif: id })];
  return [...head, ...tail];
}

export default async (req, res) => {
  const {
    method,
    query: { id },
    body: { name, phone, wide, ip },
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const share = wide < 1;

      try {
        let muwaqif = await Muwaqif.findOne({ ip });
        let block = await Block.findById(id);

        // handle if user has reach limit
        if (muwaqif) {
          const limitReached = muwaqif.total_bill >= 6000000;
          if (limitReached) {
            return res.status(400).json({
              message:
                "Kamu sudah mencapai batas waqaf dipesan (Rp 6.000.000). Silahkan bayar waqaf yang sudah dipesan dahulu untuk dapat menambah nominal waqaf.",
            });
          }
        } else {
          muwaqif = await Muwaqif.create({ name, phone, ip });
        }

        // update user total bill
        await Muwaqif.findOneAndUpdate(
          { ip },
          { $inc: { total_bill: wide * 2000000 } }
        );

        // update if block is shared
        if (block.share) {
          await MiniBlock.updateMany(
            {
              _id: { $in: getSlice(block.mini_blocks, block.available, wide) },
            },
            {
              muwaqif: muwaqif._id,
              status: "reserved",
              reserved_date: new Date().toISOString(),
            }
          );
          // create mini miniblocks if not yet exist and share is true
        } else if (share) {
          const initialMiniBlock = createMiniBlock(wide, muwaqif._id);
          const miniBlock = await MiniBlock.create(initialMiniBlock);
          await Block.findByIdAndUpdate(id, {
            status: "reserved",
            share,
            mini_blocks: miniBlock.map((x) => x._id),
            $inc: { available: -wide },
          });
          // update block
        } else {
          await Block.findByIdAndUpdate(id, {
            status: "reserved",
            share: false,
            muwaqif: muwaqif._id,
            reserved_date: new Date().toISOString(),
            available: 0,
          });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Terjadi Kesalahan, Silakan refresh halaman" });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: "Terjadi Kesalahan, Silakan refresh halaman" });
      break;
  }
};
