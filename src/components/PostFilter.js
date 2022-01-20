import React from "react";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <input
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Searching..."
      />

      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sorting"
        options={[
          { value: "title", name: "by name" },
          { value: "body", name: "by description" },
        ]}
      />
    </div>
  );
};

export default PostFilter;
