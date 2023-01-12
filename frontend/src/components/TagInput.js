import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import './style.css'

function TagInput(props) {
  const suggestionsTags = [
    { id: "SPORT", name: "SPORT" },
    { id: "RISK FREE", name: "RISK FREE" },
    { id: "EASY", name: "EASY" },
  ];

  const suggestions = suggestionsTags.map((tag) => {
    return {
      id: tag.id,
      text: tag.name,
    };
  });

  const handleDelete = (i) => {
    props.setTags(props.tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    props.setTags([...props.tags, tag]);
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = props.tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    props.setTags(newTags);
  };

  return (
    <div>
      <ReactTags
        tags={props.tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inline={false}
        autocomplete
      />
    </div>
  );
}

export default TagInput;
