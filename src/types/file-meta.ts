import * as t from "io-ts";
import { Validation } from "io-ts";

/**
 * ##NOTE: io-ts is a parser/decoder/encoder library that makes it easy to create types and encoding/decoding functions 
 * Here I'm creating a FileMeta type; first I define a codec tFileMeta; note that the _only_ two statuses possible are 
 * "available" and "scheduled" - this validation will fail with any other status values.
 * The goal here is to make the type as narrow as possible.
 */
const tFileMeta = t.type({
  name: t.string,
  device: t.string,
  path: t.string,
  status: t.union([t.literal("available"), t.literal("scheduled")]),
});

/**
 * ##NOTE: Makes an array type from the type
 */
const tFileMetaList = t.array(tFileMeta);

export type FileMeta = t.TypeOf<typeof tFileMeta>;
export type FileMetaList = t.TypeOf<typeof tFileMetaList>;

export const validate = tFileMeta.decode;
export const validateList: (i: unknown) => Validation<FileMetaList> =
  tFileMetaList.decode;

/**
 * ##NOTE: This holds the main logic for deciding if something is downloadable;
 * Advantageous to keep this separate from the component
 */
export const isDownloadable = ({ status }: FileMeta) => status === "available";
