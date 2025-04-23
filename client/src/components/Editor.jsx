import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="content bg-gray-900 rounded-lg shadow-lg">
      <ReactQuill
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
        className="bg-gray-800 text-gray-100 rounded-lg"
      />
      <style jsx global>{`
        .ql-toolbar {
          background-color: #1a1a1a;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #2d3748;
        }
        .ql-container {
          background-color: #2d3748;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #2d3748;
          min-height: 200px;
        }
        .ql-editor {
          color: #e2e8f0;
          font-size: 1rem;
        }
        .ql-snow .ql-stroke {
          stroke: #e2e8f0;
        }
        .ql-snow .ql-fill {
          fill: #e2e8f0;
        }
        .ql-snow .ql-picker {
          color: #e2e8f0;
        }
        .ql-snow .ql-picker-options {
          background-color: #1a1a1a;
          border-color: #2d3748;
        }
        .ql-snow .ql-active {
          color: #3b82f6;
        }
        .ql-snow .ql-picker-item:hover {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
}
