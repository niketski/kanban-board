import { Id, Task } from "../types"
import { Trash2, Plus, GripVertical } from "lucide-react"

interface KanbanColumnProps {
    title: string,
    id: Id
    tasks: Task[]
}

function KanbanColumn({ title } : KanbanColumnProps) {
  return (
    <div className="px-5">  
        <div className="min-h-[500px] w-[400px] border-2 bg-white rounded-lg shadow-lg flex flex-col">
            {/* column heading */}
            <div className="bg-primary flex justify-between items-center py-3 px-4 rounded-tl-lg rounded-tr-lg">
                <div className="flex items-center">
                    <button className="text-white mr-2 outline-none border-none cursor-grab">
                        <GripVertical/>
                    </button>
                    <h3 className="text-white font-bold">{title}</h3>
                    <span className="bg-white text-primary py-1 px-2 text-[14px] leading-none rounded-lg inline-block ml-3">5</span>
                </div>
                <div className="flex items-center">
                    <button className="text-white outline-none text-[10px] mr-3 hover:opacity-70 transition-opacity" title="Add task">
                        <Plus/>
                    </button>
                    <button className="text-white hover:opacity-70 transition-opacity outline-none" title="Delete column">
                        <Trash2/>
                    </button>
                </div>
            </div>
            {/* end column heading */}

            {/* column body */}
            <div className=" flex-1 overflow-y-auto p-4">
                <div className="flex flex-col">

                    <div className="py-2">
                        <div className="rounded-lg shadow bg-white px-4 break-words pt-5 pb-4">
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center">
                                    <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none mr-2" title="Delete task">
                                        <GripVertical/>
                                    </button>
                                    <p className="text-[12px]">Priority: <span className="font-bold inline-block ml-2 px-2 py-1 bg-[#55efc4] leading-none rounded-lg text-white">Low</span></p>
                                </div>
                                <div>
                                    <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none" title="Delete task">
                                        <Trash2/>
                                    </button>
                                </div>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="rounded-lg shadow bg-white px-4 break-words pt-5 pb-4">
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center">
                                    <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none mr-2" title="Delete task">
                                        <GripVertical/>
                                    </button>
                                    <p className="text-[12px]">Priority: <span className="font-bold inline-block ml-2 px-2 py-1 bg-[#fdcb6e] leading-none rounded-lg text-[12px] text-white">Medium</span></p>
                                </div>
                                <div>
                                    <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none" title="Delete task">
                                        <Trash2/>
                                    </button>
                                </div>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="rounded-lg shadow bg-white px-4 break-words pt-5 pb-4">
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center">
                                    <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none mr-2" title="Delete task">
                                        <GripVertical/>
                                    </button>
                                    <p className="text-[12px]">Priority: <span className="font-bold inline-block ml-2 px-2 py-1 bg-[#ff7675] leading-none rounded-lg text-[12px] text-white">High</span></p>
                                </div>
                                <div>
                                    <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none" title="Delete task">
                                        <Trash2/>
                                    </button>
                                </div>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
            {/* end column body */}
        </div>
    </div>
  )
}

export default KanbanColumn