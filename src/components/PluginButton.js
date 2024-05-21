import React from "react";

function PluginButton({ plugin, onClick }) {
  return (
    <button
      onClick={onClick}
      className="plugin-btn block mx-auto mt-8 bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none hover:bg-blue-600"
    >
      {plugin.name}
    </button>
  );
}

export default PluginButton;
