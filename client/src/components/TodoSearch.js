import React from "react";

const TodoSearch = ({ onSearch }) => {
  return (
    <div className="d-flex gap-3">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search tasks..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
  );
};

export default TodoSearch;
