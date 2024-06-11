import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCirclePlus,
  faCircleCheck,
  faCircleXmark,
  faSignal,
  faFilter,
  faGlobe,
  faCircleInfo,
  faHashtag,
  faFileSignature,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import PluginButton from "./PluginButton";

function MainContent({
  onAdd,
  onEdit,
  onDelete,
  projects,
  plugins,
  onOpenPlugin,
  onRefresh
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  return (
    <div className="main-content">
      <h1 className="text-3xl font-bold text-center mb-6 select-none">
        HumanitiesConnect
        <span className="text-dark-blue"> digital humanities</span>
      </h1>
      <div className="overflow-auto max-h-[75vh]">
        <table
          className="table-auto border-separate w-full"
          style={{ borderSpacing: "0 0px" }}
        >
          <thead className="sticky top-0">
            <tr>
              <th>
                <FontAwesomeIcon icon={faHashtag} className="icon" />
              </th>
              <th id="th2">
                <FontAwesomeIcon icon={faFileSignature} className="icon" />
              </th>
              <th id="th3">
                <FontAwesomeIcon icon={faCircleInfo} className="icon" />
              </th>
              <th id="th4">
                <FontAwesomeIcon icon={faGlobe} className="icon" />
              </th>
              <th className="!text-center">
                <FontAwesomeIcon icon={faSignal} className="icon" />
              </th>
              <th className="!text-center w-40">
                <FontAwesomeIcon icon={faFilter} className="icon" />
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="bg-white shadow-md shadow-slate-100 text-slate-700"
              >
                <td className="px-2 py-2">
                  <FontAwesomeIcon icon={faHashtag} className="" /> {project.id}
                </td>
                <td className="px-2 py-2">{project.name}</td>
                <td className="px-2 py-2">{project.description}</td>
                <td className="px-2 py-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {project.link}
                  </a>
                </td>
                <td className="px-2 py-2 text-center">
                  <FontAwesomeIcon
                    icon={project.isOnline ? faCircleCheck : faCircleXmark}
                    className={`text-lg ${
                      project.isOnline ? "text-green-500" : "text-red-500"
                    }`}
                  />
                </td>
                <td className="px-2 py-2 text-center">
                  <button onClick={() => onEdit(project)} className="edit-btn">
                    <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    className="delete-btn ml-1"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-group flex justify-start mt-8 space-x-4">
        <button
          onClick={onAdd}
          className="add-btn block mx-auto mt-8 bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
        <button
          onClick={handleRefresh}
          className={`refresh-btn block bg-green-500 text-white py-2 px-4 rounded-full focus:outline-none hover:bg-green-600 ${isRefreshing ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isRefreshing}
        >
          <FontAwesomeIcon icon={faArrowsRotate} spin={isRefreshing} />
        </button>
        {plugins.map((plugin) => (
          <PluginButton
            key={plugin.dir}
            plugin={plugin}
            onClick={() => onOpenPlugin(plugin.dir)}
          />
        ))}
      </div>
    </div>
  );
}

export default MainContent;
