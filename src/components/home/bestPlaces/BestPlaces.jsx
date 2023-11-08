const BestPlaces = () => {
    return (
        <div className="md:my-9 my-5">
            <div>
                <div className="md:border py-9">
                    <div className="flex flex-col md:flex-row justify-center gap-36 items-center">
                        {/* 1st */}
                        <div>
                            <p className="text-2xl mb-4 font-bold">Best Places to Work 2023</p>
                            <p>Employees have spoken! Which companies are the Best <br /> Places to Work in 2023? See the list.</p>
                        </div>
                        {/* 2nd */}
                        <div className="grid grid-cols-2 border">
                            {/* item 1 */}
                            <div className="flex  border-r border-b py-4 pr-28 pl-3 items-center gap-3">
                                <p className="font-semibold">1</p>
                                <img className="w-12" src="https://media.glassdoor.com/sql/711880/gainsight-squarelogo-1430508525120.png" alt="" />
                                <div>
                                    <p className="font-semibold">Gainsight</p>
                                    <p className="text-xs text-blue-500">4.7</p>
                                </div>
                            </div>
                            {/* item 2 */}
                            <div className="flex border-b py-4 pr-28 pl-3 items-center gap-3">
                                <p className="font-semibold">2</p>
                                <img className="w-12 border" src="https://media.glassdoor.com/sql/254092/box-squarelogo-1519691716421.png" alt="" />
                                <div>
                                    <p className="font-semibold">Box</p>
                                    <p className="text-xs text-blue-500">4.5</p>
                                </div>
                            </div>
                            {/* item 3 */}
                            <div className="flex border-b border-r py-4 pr-28 pl-3 items-center gap-3">
                                <p className="font-semibold">3</p>
                                <img className="border w-12" src="https://media.glassdoor.com/sql/3752/bain-and-company-squareLogo-1688144456047.png" alt="" />
                                <div>
                                    <p className="font-semibold">Bain & Company</p>
                                    <p className="text-xs text-blue-500">4.7</p>
                                </div>
                            </div>
                            {/* item 4 */}
                            <div className="flex border-b py-4 pr-28 pl-3 items-center gap-3">
                                <p className="font-semibold">4</p>
                                <img className="w-12 border" src="https://media.glassdoor.com/sql/2893/mckinsey-and-company-squarelogo-1552607395804.png" alt="" />
                                <div>
                                    <p className="font-semibold">MC Kinsey</p>
                                    <p className="text-xs text-blue-500">3.7</p>
                                </div>
                            </div>
                            {/* item 5 */}
                            <div className="flex border-r py-4 pr-28 pl-3 items-center gap-3">
                                <p className="font-semibold">5</p>
                                <img className="border w-12" src="https://media.glassdoor.com/sql/7633/nvidia-squareLogo-1672943582283.png" alt="" />
                                <div>
                                    <p className="font-semibold">NVIDIA</p>
                                    <p className="text-xs text-blue-500">4.9</p>
                                </div>
                            </div>
                            {/* item 1 */}
                            <div className="flex  py-4 pr-28 pl-6 items-center gap-3">
                               <p className="text-blue-500 font-semibold cursor-pointer">See the full list</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestPlaces;