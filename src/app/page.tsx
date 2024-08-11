import { Archive, FileCode, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import css from "./app.module.css";
export default function Home() {
  return (
    <div className={css.grandfather}>
      <div className={css.father}>
        <div className={css.spacingSidebarContent} />
        <div className="PvRhvb-bN97Pc">
          <div className={css.otherCtn}>
            <div className={`${css.itemCtn} ${css.active}`}>
              <div className={`${css.customItem}`}>
                <FileCode className={css.svg} />
              </div>
              <span className={css.customSpan}> Code </span>
            </div>
            <div className={`${css.itemCtn}`}>
              <div className={`${css.customItem}`}>
                <Archive className={css.svg} />
              </div>
              <span className={css.customSpan}> Archive </span>
            </div>

            <div className={`${css.itemCtn}`}>
              <div className={`${css.customItem}`}>
                <Trash2Icon className={css.svg} />
              </div>
              <span className={css.customSpan}> Bin </span>
            </div>
          </div>
          <div className={`${css.copyright} PvRhvb-hSRGPd-haAclf`}>
            <a
              href="https://ssl.gstatic.com/keep/licenses/web_client_licenses.txt"
              target="_blank"
              className={`${css.copyrightText}`}
              tabIndex={0}
            >
              Open-source licences
            </a>
          </div>
        </div>
        <div className={`${css.mainWrapper}`}>
          <div className="h1U9Be-xhiy4 w-[600px]">
            <Input placeholder="Buscar..." />
          </div>
          <div className={css.listWrapper}>
            <div className={css.snippetCtn}>
              <Button>hola</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
