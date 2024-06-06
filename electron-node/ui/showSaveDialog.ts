import { dialog } from "electron";

async function showSaveDialog(_e: any, type: string) {
  // @ts-ignore
  return await dialog.showSaveDialog(null, {
    title: "Save file",
    filters: [
      {
        name: type,
        extensions: [type],
      },
      {
        name: "All Files",
        extensions: ["*"],
      },
    ],
  });
}

export default showSaveDialog;
