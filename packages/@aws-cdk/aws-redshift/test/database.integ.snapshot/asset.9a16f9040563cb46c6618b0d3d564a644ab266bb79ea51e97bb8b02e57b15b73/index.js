"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler_name_1 = require("./handler-name");
const privileges_1 = require("./privileges");
const table_1 = require("./table");
const user_1 = require("./user");
const HANDLERS = {
    [handler_name_1.HandlerName.Table]: table_1.handler,
    [handler_name_1.HandlerName.User]: user_1.handler,
    [handler_name_1.HandlerName.UserTablePrivileges]: privileges_1.handler,
};
async function handler(event) {
    const subHandler = HANDLERS[event.ResourceProperties.handler];
    if (!subHandler) {
        throw new Error(`Requested handler ${event.ResourceProperties.handler} is not in supported set: ${JSON.stringify(Object.keys(HANDLERS))}`);
    }
    return subHandler(event.ResourceProperties, event);
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxpREFBNkM7QUFDN0MsNkNBQTJEO0FBQzNELG1DQUFpRDtBQUNqRCxpQ0FBK0M7QUFFL0MsTUFBTSxRQUFRLEdBQWlIO0lBQzdILENBQUMsMEJBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxlQUFXO0lBQ2hDLENBQUMsMEJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFVO0lBQzlCLENBQUMsMEJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLG9CQUFnQjtDQUNwRCxDQUFDO0FBRUssS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUFrRDtJQUM5RSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQXNCLENBQUMsQ0FBQztJQUM3RSxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sNkJBQTZCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM1STtJQUNELE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBTkQsMEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAqIGFzIEFXU0xhbWJkYSBmcm9tICdhd3MtbGFtYmRhJztcbmltcG9ydCB7IEhhbmRsZXJOYW1lIH0gZnJvbSAnLi9oYW5kbGVyLW5hbWUnO1xuaW1wb3J0IHsgaGFuZGxlciBhcyBtYW5hZ2VQcml2aWxlZ2VzIH0gZnJvbSAnLi9wcml2aWxlZ2VzJztcbmltcG9ydCB7IGhhbmRsZXIgYXMgbWFuYWdlVGFibGUgfSBmcm9tICcuL3RhYmxlJztcbmltcG9ydCB7IGhhbmRsZXIgYXMgbWFuYWdlVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbmNvbnN0IEhBTkRMRVJTOiB7IFtrZXkgaW4gSGFuZGxlck5hbWVdOiAoKHByb3BzOiBhbnksIGV2ZW50OiBBV1NMYW1iZGEuQ2xvdWRGb3JtYXRpb25DdXN0b21SZXNvdXJjZUV2ZW50KSA9PiBQcm9taXNlPGFueT4pIH0gPSB7XG4gIFtIYW5kbGVyTmFtZS5UYWJsZV06IG1hbmFnZVRhYmxlLFxuICBbSGFuZGxlck5hbWUuVXNlcl06IG1hbmFnZVVzZXIsXG4gIFtIYW5kbGVyTmFtZS5Vc2VyVGFibGVQcml2aWxlZ2VzXTogbWFuYWdlUHJpdmlsZWdlcyxcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBBV1NMYW1iZGEuQ2xvdWRGb3JtYXRpb25DdXN0b21SZXNvdXJjZUV2ZW50KSB7XG4gIGNvbnN0IHN1YkhhbmRsZXIgPSBIQU5ETEVSU1tldmVudC5SZXNvdXJjZVByb3BlcnRpZXMuaGFuZGxlciBhcyBIYW5kbGVyTmFtZV07XG4gIGlmICghc3ViSGFuZGxlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWVzdGVkIGhhbmRsZXIgJHtldmVudC5SZXNvdXJjZVByb3BlcnRpZXMuaGFuZGxlcn0gaXMgbm90IGluIHN1cHBvcnRlZCBzZXQ6ICR7SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoSEFORExFUlMpKX1gKTtcbiAgfVxuICByZXR1cm4gc3ViSGFuZGxlcihldmVudC5SZXNvdXJjZVByb3BlcnRpZXMsIGV2ZW50KTtcbn1cbiJdfQ==