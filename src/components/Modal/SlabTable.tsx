interface IProps<T> {
  slab: T[];
}

const SlabTable = <T,>({ slab }: IProps<T>) => {
  return (
    <div className="space-y-2 mt-3">
      <div className="max-h-[200px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-1 text-left">Slab</th>
              <th className="p-1 text-left">Range</th>
              <th className="p-1 text-left">Charges</th>
              <th className="p-1 text-left">GST</th>
            </tr>
          </thead>
          <tbody>
            {slab?.map((item: any, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 border-gray-300"
              >
                <td className="p-1">{item.slabSequence ?? "-"}</td>
                <td className="p-1">
                  ₹{item.minTxnValue ?? "-"} - ₹{item.maxTxnValue ?? "-"}
                </td>
                <td className="p-1">
                  {/* {item.calculationType === "PERCENTAGE"
                                                            ? item.percentage != null && item.percentage !== ''
                                                              ? `${item.percentage}%`
                                                              : '-'
                                                            : item.fixed != null && item.fixed !== ''
                                                              ? `₹${item.fixed}`
                                                              : '-'} */}
                  {item?.charges ?? "-"}
                </td>
                <td className="p-1">{item.gst ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlabTable;
