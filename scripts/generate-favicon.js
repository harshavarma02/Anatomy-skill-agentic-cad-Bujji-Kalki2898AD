import fs from "fs";

function createICO() {
  const width = 16;
  const height = 16;
  const bpp = 32;
  const imageSize = width * height * 4;
  const headerSize = 6;
  const dirEntrySize = 16;
  const bihSize = 40;
  const maskSize = (width * height) / 8;
  const totalBitmapSize = bihSize + imageSize + maskSize;
  const totalFileSize = headerSize + dirEntrySize + totalBitmapSize;

  const buf = Buffer.alloc(totalFileSize);

  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(1, 4);

  buf.writeUInt8(width, 6);
  buf.writeUInt8(height, 7);
  buf.writeUInt8(0, 8);
  buf.writeUInt8(0, 9);
  buf.writeUInt16LE(1, 10);
  buf.writeUInt16LE(bpp, 12);
  buf.writeUInt32LE(totalBitmapSize, 14);
  buf.writeUInt32LE(headerSize + dirEntrySize, 18);

  const bihOffset = headerSize + dirEntrySize;
  buf.writeUInt32LE(bihSize, bihOffset);
  buf.writeInt32LE(width, bihOffset + 4);
  buf.writeInt32LE(height * 2, bihOffset + 8);
  buf.writeUInt16LE(1, bihOffset + 12);
  buf.writeUInt16LE(bpp, bihOffset + 14);
  buf.writeUInt32LE(0, bihOffset + 16);
  buf.writeUInt32LE(imageSize + maskSize, bihOffset + 20);

  const pixelOffset = bihOffset + bihSize;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = pixelOffset + (y * width + x) * 4;
      const dx = x - 7.5;
      const dy = (height - 1 - y) - 7.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= 7.5 && dist >= 5.5) {
        buf[idx] = 0x33;
        buf[idx + 1] = 0x29;
        buf[idx + 2] = 0x1e;
        buf[idx + 3] = 0xff;
      } else if (dist < 5.5 && dist >= 3.0) {
        buf[idx] = 0x16;
        buf[idx + 1] = 0x73;
        buf[idx + 2] = 0xf9;
        buf[idx + 3] = 0xff;
      } else if (dist < 3.0 && dist >= 1.5) {
        buf[idx] = 0xd4;
        buf[idx + 1] = 0xb6;
        buf[idx + 2] = 0x06;
        buf[idx + 3] = 0xff;
      } else if (dist < 1.5) {
        buf[idx] = 0x0e;
        buf[idx + 1] = 0x09;
        buf[idx + 2] = 0x07;
        buf[idx + 3] = 0xff;
      } else {
        buf[idx] = 0;
        buf[idx + 1] = 0;
        buf[idx + 2] = 0;
        buf[idx + 3] = 0;
      }
    }
  }

  return buf;
}

const ico = createICO();
fs.writeFileSync("favicon.ico", ico);
fs.writeFileSync("public/favicon.ico", ico);
console.log(`favicon.ico created successfully (${ico.length} bytes)`);
