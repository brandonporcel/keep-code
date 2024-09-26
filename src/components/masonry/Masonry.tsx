import { Fragment, Key, ReactNode } from "react";
import { range } from "./range";
import { useSize } from "./useSize";

export function Masonry<T>({
  items,
  itemKey,
  columnWidth,
  gap,
  renderItem,
}: {
  items: T[];
  itemKey: (item: T) => Key;
  columnWidth: number;
  gap?: number | string;
  renderItem: (item: T, index: any) => ReactNode;
}) {
  const [sizeRef, size] = useSize();
  const columnCount = Math.floor(size.width / columnWidth);

  return (
    <div ref={sizeRef} className="flex" style={{ gap }}>
      {range(columnCount).map((columnIndex) => (
        <div key={columnIndex} className="flex flex-col flex-1" style={{ gap }}>
          {range(columnIndex, items.length, columnCount).map((itemIndex) => (
            <Fragment key={itemKey(items[itemIndex])}>
              {renderItem(items[itemIndex], itemIndex)}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
