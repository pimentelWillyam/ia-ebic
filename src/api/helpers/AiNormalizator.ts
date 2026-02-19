import { response } from "express";

export interface AiResponse {
  identidadeDesconhecida: boolean;
  nome: string;
  nomeMae: string;
  apelido: string;
  sexo: "MASCULINO" | "FEMININO" | "DESCONHECIDO";
  nomeSocial: string;
  dataNascimento: string | null;
  idadeAparente: string;
  corPele: "AMARELA" | "BRANCA" | "INDÍGENA" | "NEGRA" | "PARDA" | "DESCONHECIDA";
  posicaoNaQualCorpoFoiEncontrado: "DORSAL" | "LATERAL DIREITO" | "LATERAL ESQUERDO" | "VENTRAL" | "OUTRO" | "NÃO SE APLICA";
  tipoLocalMorte: "AREIA" | "ASFALTO" | "AÇUDE" | "BARRO" | "CANAVIAL" | "CIMENTO" | "LAGOA" | "LAMA" | "MANGUEZAL" | "MAR" | "MATA" | "NÃO SE APLICA";
  corpoEstavaVestido: "SIM"| "NÃO" | "PARCIALMENTE" | "NÃO SE APLICA";
  dataHoraObito: string | null;
  dataHoraObitoDesconhecida: boolean;
  naturezaOcorrencia: "A ESCLARECER" | "ACIDENTE DE TRÂNSITO" | "HOMICÍDIO" | "LATROCÍNIO" | "LESÃO CORPORAL SEG. DE MORTE" | "SUICÍDIO" | "OUTROS ACIDENTES";
  intencao: "CULPOSO" | "DOLOSO" | "NÃO SE APLICA";
  objetosUtilizados: Array<
    "ARMA BRANCA" | "ARMA DE FOGO" | "OBJETO CONTUNDENTE" | "NAO SE APLICA"
  >;

  informacoesComplementaresCorpo: string;
  descrevaOcorrencia: string;
}




export class AiNormalizator {
    static execute(json: any): AiResponse {
        return {
            identidadeDesconhecida: json.identidadeDesconhecida,
            nome: this.formatName(json.nome || ""),
            nomeMae: this.formatName(json.nomeMae || ""),
            apelido: this.formatName(json.apelido || ""),
            sexo: json.sexo || "DESCONHECIDO",
            nomeSocial: this.formatName(json.nomeSocial || ""),
            dataNascimento: json.dataNascimento || null,
            idadeAparente: json.idadeAparente?.toString() || "",
            corPele: this.normalizeSkinColor(json.corPele || "DESCONHECIDA"),
            posicaoNaQualCorpoFoiEncontrado: this.normalizePosition(json.posicaoNaQualCorpoFoiEncontrado || "NÃO SE APLICA"),
            tipoLocalMorte: this.normalizeTypeOfDeathPlace(json.tipoLocalMorte || "NÃO SE APLICA"),
            corpoEstavaVestido: this.normalizeWasBodyDressed(json.corpoEstavaVestido || "NÃO SE APLICA"),
            dataHoraObito: json.dataHoraObito || null,
            dataHoraObitoDesconhecida: json.dataHoraObitoDesconhecida || false,
            naturezaOcorrencia: this.normalizeNatureOfOccurrence(json.naturezaOcorrencia || "A ESCLARECER"),
            intencao: this.normalizeIntention(json.intencao || "NÃO SE APLICA"),
            objetosUtilizados: this.normalizeObjectsUsed(json.objetosUtilizados || []),
            informacoesComplementaresCorpo: json.informacoesComplementaresCorpo || "",
            descrevaOcorrencia: json.descrevaOcorrencia || ""
        };
    }

    private static formatName(name: string): string {
        return name.trim().split(/\s+/).map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(" ")
    }

    private static normalizeSkinColor(color: string): "AMARELA" | "BRANCA" | "INDÍGENA" | "NEGRA" | "PARDA" | "DESCONHECIDA" {
        if (color === "AMARELA" || color === "BRANCA" || color === "INDÍGENA" || color === "NEGRA" || color === "PARDA" || color === "DESCONHECIDA") {
            return color;
        }
        return "DESCONHECIDA";
    }

    private static normalizePosition(position: string): "DORSAL" | "LATERAL DIREITO" | "LATERAL ESQUERDO" | "VENTRAL" | "OUTRO" | "NÃO SE APLICA" {
        if (position === "DORSAL" || position === "LATERAL DIREITO" || position === "LATERAL ESQUERDO" || position === "VENTRAL" || position === "OUTRO" || position === "NÃO SE APLICA") {
            return position;
        }
        return "NÃO SE APLICA";
    }

    private static normalizeTypeOfDeathPlace(type: string): "AREIA" | "ASFALTO" | "AÇUDE" | "BARRO" | "CANAVIAL" | "CIMENTO" | "LAGOA" | "LAMA" | "MANGUEZAL" | "MAR" | "MATA" | "NÃO SE APLICA" {
        if (type === "AREIA" || type === "ASFALTO" || type === "AÇUDE" || type === "BARRO" || type === "CANAVIAL" || type === "CIMENTO" || type === "LAGOA" || type === "LAMA" || type === "MANGUEZAL" || type === "MAR" || type === "MATA" || type === "NÃO SE APLICA") {
            return type;
        }
        return "NÃO SE APLICA"
    }

    private static normalizeWasBodyDressed(dressed: string): "SIM"| "NÃO" | "PARCIALMENTE" | "NÃO SE APLICA" {
        if (dressed === "SIM" || dressed === "NÃO" || dressed === "PARCIALMENTE" || dressed === "NÃO SE APLICA") {
            return dressed;
        }
        return "NÃO SE APLICA"
    }

    private static normalizeNatureOfOccurrence(nature: string): "A ESCLARECER" | "ACIDENTE DE TRÂNSITO" | "HOMICÍDIO" | "LATROCÍNIO" | "LESÃO CORPORAL SEG. DE MORTE" | "SUICÍDIO" | "OUTROS ACIDENTES" {
        if (nature === "A ESCLARECER" || nature === "ACIDENTE DE TRÂNSITO" || nature === "HOMICÍDIO" || nature === "LATROCÍNIO" || nature === "LESÃO CORPORAL SEG. DE MORTE" || nature === "SUICÍDIO" || nature === "OUTROS ACIDENTES") {
            return nature;
        }
        return "A ESCLARECER";
    }

    private static normalizeIntention(intention: string): "CULPOSO" | "DOLOSO" | "NÃO SE APLICA" {
        if (intention === "CULPOSO" || intention === "DOLOSO" || intention === "NÃO SE APLICA") {
            return intention;
        }
        return "NÃO SE APLICA"
    }
    
    private static normalizeObjectsUsed(objects: any): Array<"ARMA BRANCA" | "ARMA DE FOGO" | "OBJETO CONTUNDENTE" | "NAO SE APLICA"> {
        if (Array.isArray(objects)) {
            return objects.filter((obj: any) =>
                obj === "ARMA BRANCA" || obj === "ARMA DE FOGO" || obj === "OBJETO CONTUNDENTE" || obj === "NAO SE APLICA"
            );
        }
        return [];
    }
}
