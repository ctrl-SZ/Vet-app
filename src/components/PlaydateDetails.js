const PlaydateDetails = ({ playdate }) => {
  return (
    <div className="playdate-details">
      <h4>From: {playdate.sender}</h4>
      <p>Message: {playdate.message}</p>
      <p>{playdate.createdAt}</p>
    </div>
  );
};
export default PlaydateDetails;
