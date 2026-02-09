export interface InformacoesVitima{      
      identidadeDesconhecida: boolean,
      nome: string
      nomeMae: string
      apelido: string
      sexo: string
      nomeSocial: string
      dataNascimento: Date | null
      idadeAparente: string
      corPele: string
      posicaoNaQualCorpoFoiEncontrado: string
      tipoLocalMorte: string
      corpoEstavaVestido: string
      dataHoraObito: Date | null
      dataHoraObitoDesconhecida: boolean
      naturezaOcorrencia: string
      intencao: string
      objetosUtilizados: string
      informacoesComplementaresCorpo: string  
      examesNaoSaoSolicitados: boolean
      exameSubungueal: boolean
      coletaDNAReferencia: boolean
      restosMortaisNaoIdentificados: boolean
      toxicologico: boolean
      vaginal: boolean
      anal: boolean
      residuografico: boolean
      alcoolemia: boolean
      outrosExames: boolean
      descricaoOutrosExames: string
      NIC: string
      posicaoComoCorpoFoiEncontrado: string
      imagemIdentificadoraCorpo: string
      PICAplicada: string
      documentoVitima: string
      descrevaOcorrencia: string
    }