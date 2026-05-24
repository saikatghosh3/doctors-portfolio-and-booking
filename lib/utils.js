export function serializeDoc(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

export function serializeDocs(docs) {
  if (!Array.isArray(docs)) return [];
  return docs.map(serializeDoc);
}
