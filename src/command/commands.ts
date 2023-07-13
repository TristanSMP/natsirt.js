import _adminCommands from "./admin/_adminCommands";
import _utilCommands from "./util/_utilCommands";

export const Commands = [_utilCommands, _adminCommands].flat();
