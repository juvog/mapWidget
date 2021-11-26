import { default as React } from "react"
import { FieldsTypeAnalysis } from "./FieldsTypeAnalysis"
import { SimpleAnalysis } from "./SimpleAnalysis"

// allow to choose the type of analysis on the layer "Vaudreuil types de sols"
const SoilChoiceOfAnalysisForm = () => {
  const [choice, setChoice] = React.useState("")

  return (
    <div>
      <form>
        <div>
          <label>
            <input
              type="radio"
              checked={choice === "sumAveAmo"}
              id="sumAveAmo"
              value="sumAveAmo"
              onChange={e => setChoice(e.target.value)}
            />
            Nombre et superficie des terrains
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="fieldsDist"
              checked={choice === "fieldsDist"}
              value="fieldsDist"
              onChange={e => setChoice(e.target.value)}
            />
            Nombre de terrains par famille de sol
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="percFieldsDist"
              checked={choice === "percFieldsDist"}
              value="percFieldsDist"
              onChange={e => setChoice(e.target.value)}
            />
            Superficie (%) des familles de sol
          </label>
        </div>
      </form>

      {choice === "sumAveAmo" ? (
        <div>
          <div>
            <SimpleAnalysis analysisChoice={choice} />
          </div>
        </div>
      ) : choice === "fieldsDist" || choice === "percFieldsDist" ? (
        <div>
          <div>
            <FieldsTypeAnalysis analysisChoice={choice} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default SoilChoiceOfAnalysisForm
