import { default as React } from "react"
import { MtlAnalysis } from "./MtlAnalysis"

// allow to choose the type of analysis on the layer "Vaudreuil types de sols"
const MtlChoiceOfAnalysisForm = () => {
  const [choice, setChoice] = React.useState("")

  return (
    <div>
      <form>
        <div>
          <label>
            <input type="radio" checked={choice === "sum"} id="sum" value="sum" onChange={e => setChoice(e.target.value)} />
            Nombre de lieux
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="placesDist"
              checked={choice === "placesDist"}
              value="placesDist"
              onChange={e => setChoice(e.target.value)}
            />
            Nombre de lieux par type
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="percPlacesDist"
              checked={choice === "percPlacesDist"}
              value="percPlacesDist"
              onChange={e => setChoice(e.target.value)}
            />
            Proportion de lieux par type (%)
          </label>
        </div>
      </form>

      <div>
        <MtlAnalysis analysisChoice={choice} />
      </div>
    </div>
  )
}
export default MtlChoiceOfAnalysisForm
