import { Select } from "@material-ui/core"
import { default as React } from "react"
import MtlChoiceOfAnalysisForm from "./MontrealLayersComponents/MtlChoiceOfAnalysisForm"
import SoilChoiceOfAnalysisForm from "./SoilsLayerComponents/SoilChoiceOfAnalysisForm"

// allow to choose the type of analysis on the layer "Vaudreuil types de sols"
const ChoiceOfLayerForm = () => {
  const [layerChoice, setLayerChoice] = React.useState("")

  const layerOptions = [
    { value: "-1", text: "Veuillez choisir une couche" },
    { value: "montrealPlaces", text: "Lieux - Montréal" },
    { value: "soilTypes", text: "Sols - MRC Vaudreuil-Soulanges" }
    //  { key: "-1",  value: "-1", text: "Veuillez choisir une couche" },
    // {  key: "6", value: "montrealPlaces", text: "Lieux - Montréal" },
    // { value: "soilTypes", text: "Sols - MRC Vaudreuil-Soulanges" }
  ]

  return (
    <div>
      <Select
        value={layerChoice}
        placeholder="Choisissez une couche"
        native
        onChange={e => {
          setLayerChoice(e.target.value as string)
          // Zoom sur la couche choisie
          let layerId
          if (e.target.value === "montrealPlaces") layerId = 6
          else layerId = 7
          const extent = JMap.Layer.getEPSG4326Extent(layerId)
          if (!extent) {
            console.error(`Cannot get extent for layer id="${layerId}"`)
            // messageSVC.error(translate("layer.zoom-to-extent.error"))
            return
          }
          JMap.Layer.ensureLayerIsVisible(layerId)
          JMap.Map.zoomToRect(extent)
        }}>
        {layerOptions.map((option, index) => (
          <option value={String(option.value)} key={index}>
            {option.text}
          </option>
        ))}
      </Select>

      {layerChoice === "montrealPlaces" ? (
        <div>
          <div>
            <MtlChoiceOfAnalysisForm />
          </div>
        </div>
      ) : layerChoice === "soilTypes" ? (
        <div>
          <div>
            <SoilChoiceOfAnalysisForm />
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ChoiceOfLayerForm
