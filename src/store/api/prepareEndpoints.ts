export default function prepareEndpoints(struct: any, parentPath = "", base = "") {
    if (typeof struct != "object") return;

    for (const key in struct) {
        const item = struct[key];

        if (key.charAt(0) === "$") {
            if (typeof item == "object" && !item.path) {
                struct[key] = {...struct[key]};
                struct[key].path = parentPath;
                struct[key].base = base;
                struct[key].name = key;
            }
        } else {
            prepareEndpoints(item, `${parentPath}/${key}`, base);
        }
    }
}
