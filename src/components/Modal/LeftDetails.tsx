import DetailsCard from "./DetailsCard";
import SlabTable from "./SlabTable";

interface slabDetails {
  gst: string;
  fixed: null;
  charges: string;
  percentage: null;
  maxTxnValue: number;
  minTxnValue: number;
  slabSequence: number;
  calculationType: string;
}

interface panCardData {
  lastName: string;
  mobile_no: string;
  pan: string;
  firstName: string;
  name: string;
  middleName: string;
  businessName: null;
  email: null;
  state: null;
  pinCode: null;
}

interface slabProps {
  slabDetails: slabDetails[];
  panCardData: panCardData;
}

const LeftDetails = ({ slabDetails, panCardData }: slabProps) => {
  return (
    <div className="p-2 !space-y-2">
      <div className="flex justify-between gap-2">
        <DetailsCard
          title="Merchant PAN Card Details"
          data={panCardData}
          fields={["firstName", "mobile_no", "pan"]}
        />
      </div>

      <div>
        <div className="bg-gray-50 rounded-xl !p-2 border-1 border-gray-300">
          <SlabTable slab={slabDetails} />
        </div>
      </div>
    </div>
  );
};

export default LeftDetails;
