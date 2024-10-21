import { Archive, FileCode, Trash2Icon } from "lucide-react";
import css from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={`${css.sidebar} bg-background`}>
      <div className="grow">
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

      <div className={`${css.copyright}`}>
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
  );
};

export default Sidebar;
