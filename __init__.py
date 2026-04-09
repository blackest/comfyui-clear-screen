from aiohttp import web
import server
import os

WEB_DIRECTORY = "js"
NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}


@server.PromptServer.instance.routes.get("/utils/cls_mps")
async def clear_console(request):

    if os.name == "nt":
        os.system("cls")
    else:
        os.system("clear")
        # This is the "Universal" way to talk to a Unix terminal
        # \033[H moves cursor to home, \033[2J clears the screen
        # \033[3J clears the scrollback buffer (the deep clean)
        print("\033[H\033[2J\033[3J", end="", flush=True)

    return web.Response(status=200)