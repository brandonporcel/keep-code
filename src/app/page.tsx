import { Archive, FileCode, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import css from "./app.module.css";
export default function Home() {
  return (
    <div className={css.grandfather}>
      <div className={css.father}>
        <div className="PvRhvb-qAWA2">
          <div className={css.spacingSidebarContent} />
          <div className="PvRhvb-bN97Pc">
            <div className="PvRhvb-LgbsSe-haAclf">
              <div className="custom-itemmm-father active">
                <div className="custom-itemmm">
                  <FileCode />
                </div>
                <span className="PvRhvb-ibnC6b-V67aGc"> Code </span>
              </div>
              <div className="custom-itemmm-father">
                <div className="custom-itemmm">
                  <Archive />
                </div>
                <span className="PvRhvb-ibnC6b-V67aGc"> Archive </span>
              </div>

              <div className="custom-itemmm-father">
                <div className="custom-itemmm">
                  <Trash2Icon />
                </div>
                <span className="PvRhvb-ibnC6b-V67aGc"> Bin </span>
              </div>
            </div>
            <div className="PvRhvb-hSRGPd-haAclf">
              <a
                href="https://ssl.gstatic.com/keep/licenses/web_client_licenses.txt"
                target="_blank"
                className="PvRhvb-hSRGPd"
                tabIndex={0}
              >
                Open-source licences
              </a>
            </div>
          </div>
        </div>
        <div className="RfDI4d-bN97Pc ogm-kpc">
          <div className="h1U9Be-xhiy4 qAWA2 style-hcSsn">
            <Input placeholder="Buscar..." />
          </div>
          <div className="RfDI4d-fSxGw-B1neQd-RFnRab"></div>
          <div className="gkA7Yd-sKfxWe ma6Yeb-r8s4j-gkA7Yd style-jGlIp">
            <div id="style-BgZpe" className="style-BgZpe">
              <Button>hola</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
