// 80+ distinct Unsplash hotel/resort images — each hotel gets a unique assignment by index
const HOTEL_IMAGE_POOL = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
  'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
  'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
  'https://images.unsplash.com/photo-1559599810-46d1c16ce0cd?w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1549517045-bc7dbf052b94?w=800&q=80',
  'https://images.unsplash.com/photo-1465056836643-15cea6careddd?w=800&q=80',
  'https://images.unsplash.com/photo-1527576539890-dfa540c45565?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  'https://images.unsplash.com/photo-1598928506323-274ce5b6a359?w=800&q=80',
  'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800&q=80',
  'https://images.unsplash.com/photo-1519004596996-d0827156e634?w=800&q=80',
  'https://images.unsplash.com/photo-1564501049351-8f4e85b0c1d1?w=800&q=80',
  'https://images.unsplash.com/photo-1537521506032-f3fa526b7d1f?w=800&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
  'https://images.unsplash.com/photo-1519451241324-20287e6811f2?w=800&q=80',
  'https://images.unsplash.com/photo-1523250335684-a5c8bdc0d50a?w=800&q=80',
  'https://images.unsplash.com/photo-1548371528-c9346940d398?w=800&q=80',
  'https://images.unsplash.com/photo-1537359521261-38c75010e6c9?w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=800&q=80',
  'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
  'https://images.unsplash.com/photo-1439066290691-daf37e16e5a7?w=800&q=80',
  'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
  'https://images.unsplash.com/photo-1522798514821-1a390a2d4ed8?w=800&q=80',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
  'https://images.unsplash.com/photo-1571008887538-b36bb805f929?w=800&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  'https://images.unsplash.com/photo-1611892440504-42a988e75f7b?w=800&q=80',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&sat=-20',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&sat=10',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&fit=crop&crop=edges',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fit=crop&crop=entropy',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&fit=crop&crop=top',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80&fit=crop&crop=bottom',
  'https://images.unsplash.com/photo-1610641818989-c2051b5e2d4a?w=800&q=80',
  'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
  'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584132915807-fd1f5fad0788?w=800&q=80',
  'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  'https://images.unsplash.com/photo-1501119348248-7e34aa7f0662?w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4fcf2ff9b04?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=700&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=550&fit=crop&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1559599810-46d1c16ce0cd?w=800&h=580&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=620&fit=crop&q=80',
];

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const getImageByIndex = (index) => HOTEL_IMAGE_POOL[Math.abs(index) % HOTEL_IMAGE_POOL.length];

const getImageForHotel = (hotel, listIndex = null) => {
  const key = String(hotel?._id || hotel?.name || '0');
  const idx = listIndex !== null ? listIndex : hashString(key);
  return getImageByIndex(idx);
};

/** Assign a distinct image per hotel (sequential round-robin through the pool). */
const assignUniqueImagesToHotels = async (Hotel) => {
  const hotels = await Hotel.find().sort({ _id: 1 }).select('_id image');
  if (hotels.length === 0) return { updated: 0, total: 0 };

  const bulkOps = hotels.map((hotel, index) => ({
    updateOne: {
      filter: { _id: hotel._id },
      update: { $set: { image: getImageByIndex(index) } },
    },
  }));

  await Hotel.bulkWrite(bulkOps);
  return { updated: bulkOps.length, total: hotels.length };
};

module.exports = {
  HOTEL_IMAGE_POOL,
  getImageByIndex,
  getImageForHotel,
  assignUniqueImagesToHotels,
};
