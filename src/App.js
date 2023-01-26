import React, { useEffect, useState, useRef } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';


import "./App.css";

import Logo from "./assets/img/logo.png";

import api from "./services/axios";

import api2 from "./services/axiosXmlNews";

import "animate.css";

import Speech from "react-speech";

import Configuracao from "./components/tabela/configuracao";

function App() {

  const toast = useRef(null);


  const [configTabela, setConfigTabela] = useState(JSON.parse(localStorage.getItem("tabela")));

  const [tabela, setTabela] = useState([""]);

  const [trocaSegundos, setTrocaSegundos] = useState([]);

  const [senhaTelaCheia, setSenhaTelaCheia] = useState(false);
  const [senhaPrioridadeTelaCheia, setSenhaPrioridadeTelaCheia] =
    useState(false);

  const [senha, setSenha] = useState(0);
  const [senhaPrioridade, setSenhaPrioridade] = useState(0);

  const [ultimaSenha, setUltimaSenha] = useState(false);

  const [noticias, setNoticias] = useState([]);
  const [totalNoticias, setTotalNoticias] = useState(20);

  const [displayConfig, setDisplayConfig] = useState(false);

  const [data, setData] = useState([])

  const [page, setPage] = useState(1);
  const [linha, setLinha] = useState(1);





  const rowsPerPage = 15 // number of rows to display per page
  //const data = [/* your data */];
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const startIndexN = (linha - 1) * 1;
  const endIndexN = startIndexN + 1;

  const currentPageData = data.slice(startIndex, endIndex);

  const currentPageDataNews = noticias.slice(startIndexN, endIndexN);

  const incrementSenha = () => {
    setSenhaTelaCheia(true);
    setUltimaSenha(true);

    return setSenha(senha + 1);
  };

  const decrementSenha = () => {
    return setSenha(senha - 1);
  };

  const decrementSenhaPrioridade = () => {
    return setSenhaPrioridade(senhaPrioridade - 1);
  };

  const incrementSenhaPrioridade = () => {
    setSenhaPrioridadeTelaCheia(true);
    setUltimaSenha(false);

    return setSenhaPrioridade(senhaPrioridade + 1);
  };

  const tabelaConfig = () => {
    return api
      .get(`/api_public/tabelapreco/configuracao/`)
      .then((r) => {
        setTabela(r.data);


      })
      .catch((e) => {
        console.log(e);
      });
  };





  const getProdutos = () => {


    console.log(currentPageData)
    return api.get(`/api_public/tabelapreco/display/${configTabela?.tabela?.id}/${configTabela?.loja?.idfilial}`).then((r) => {
      toast.current.show({ severity: 'info', summary: 'Informação', detail: `Produtos atualizados` });
      setData(r.data)
      console.log(r.data)
    }).catch((error) => {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: `${error.message}` });
    })

  }

  const getNoticias = () => {
    api2
      .get(
        `https://newsapi.org/v2/top-headlines?country=br&apiKey=449d30ca9a734c32bb60df79a52619ca`
      )
      .then((response) => {
        setNoticias(response.data.articles);
      })
      .catch((error) => {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: `${error.message}` });
      });
  };

  useEffect(() => {
    setConfigTabela(JSON.parse(localStorage.getItem("tabela")));
    tabelaConfig();
    getNoticias();
    getProdutos()

    const intervalId = setInterval(() => {
      setLinha((total) => {
        if (total <= noticias.length || total <= totalNoticias) {
          return total + 1;
        }
        return 1;
      });
      setPage((prevPage) => {
        if (prevPage === totalPages) {
          return 1;
        }
        return prevPage + 1;
      });
    }, 5000);
    return () => clearInterval(intervalId);

  }, [totalPages]);

  return (
    <>
      <Toast ref={toast} />
      <div>
        <Button
          style={{
            position: "fixed",
            right: "1%",
            top: "1%",
            zIndex: '1'
          }}
          onClick={() => setDisplayConfig(true)}
          className="p-button p-button-rounded"
          icon="pi pi-cog"
        />
      </div>

      {configTabela?.habilitaSenhaPreferencial &&
        configTabela?.habilitarSenhaNormal ? (
        <></>
      ) : (
        <>
          <div className="w-1 h-15">
            <h1 className="text-4xl m-2  text-yellow-100 font-Pacifico">
              {configTabela?.tabela?.descricao}
            </h1>
          </div>
        </>
      )}

      <div className="flex flex-row">


        <div className="w-72 flex flex-col justify-center items-center">


          <img style={{ width: "200px" }} src={Logo} />
          <div className="flex flex-col justify-center items-center">
            {configTabela?.habilitarSenhaNormal ? (
              <>
                <div className="text-white flex flex-row justify-start items-start">
                  <h1>Normal</h1>

                  <Button
                    style={{ margin: "5px" }}
                    className="p-button p-button-rounded p-button-success "
                    icon="pi pi-plus"
                    onClick={incrementSenha}
                  />
                  <Button
                    style={{ margin: "5px" }}
                    className="p-button p-button-rounded p-button-primary"
                    icon="pi pi-minus"
                    onClick={decrementSenha}
                  />
                </div>

                <h2 className="text-4xl text-start text-white">SENHA</h2>
                <h1 className=" text-8xl font-semibold text-white">{senha}</h1>
              </>
            ) : (
              <></>
            )}

            {configTabela?.habilitaSenhaPreferencial ? (
              <>
                <div className="text-white flex flex-row justify-center items-start mt-1">
                  <h1>Prioridade</h1>

                  <Button
                    style={{ margin: "5px" }}
                    className="p-button p-button-rounded p-button-success "
                    icon="pi pi-plus"
                    onClick={incrementSenhaPrioridade}
                  />
                  <Button
                    style={{ margin: "5px" }}
                    className="p-button p-button-rounded p-button-primary "
                    icon="pi pi-minus"
                    onClick={decrementSenhaPrioridade}
                  />
                </div>

                <h2 className="text-4xl text-start text-white">PREFERENCIAL</h2>
                <h1 className=" text-8xl font-semibold text-white">
                  {senhaPrioridade}
                </h1>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div style={{ width: "80%", position: 'fixed', top: '1%', left: '20%' }}>
          <table className="min-w-full  border-separate border-spacing-1">
            <thead>
              <tr className="bg-yellow-600">
                <th className=" text-lg text-white border border-slate-600 ">
                  Código
                </th>
                <th className=" text-lg text-white border border-slate-600 ">
                  Produto
                </th>
                <th className="text-lg text-white border border-slate-600 ">
                  Preço
                </th>
              </tr>
            </thead>
            <tbody>

              {currentPageData.map((row, index) => (
                <tr className="even:bg-blue-500 odd:bg-red-500 h-8" key={index}>
                  <td className=" text-white border-spacing-8 border border-slate-700 text-center  font-semibold text-3xl ">
                    {row.codigo}
                  </td>
                  <td className=" text-white border-spacing-8 border border-slate-700 text-start  font-semibold text-3xl ">
                    {row.produto}
                  </td>
                  <td className="text-yellow-50 border-spacing-8 border border-slate-700 text-center text-opacity-100  font-semibold text-4xl">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(row.preco)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full">
        <div className="ticker-wrapper">
          <div className="bigHeading"> Notícias </div>

          <div className=" flex  items-center justify-evenly  text-update">
            <div className="">
              {currentPageDataNews.map((m, i) => (
                <h1 key={i}>{m?.title}</h1>
              ))}
            </div>
            {/*<div className="mt-1">
              {currentPageDataNews.map((m, i) => (
                <p key={i}>{` ${m?.description}`} </p>
              ))}
            </div>
              */}
          </div>
        </div>
      </div>
      <Dialog
        draggable={false}
        position="bottom-right"
        className="text-5xl text-center "
        header="Atenção cliente amigo"
        visible={senhaTelaCheia}
        modal={false}
        style={{ width: "100%" }}
        onHide={() => setSenhaTelaCheia(false)}
      >
        <div className="flex justify-center items-center gap-1">
          <h1 className="text-9xl animate__animated animate__pulse animate__infinite">
            SENHA {senha}
          </h1>
          <h2 className="text-5xl">
            <Speech
              className="rs-play"
              lang="pt-BR"
              textAsButton
              displayText="Chamar"
              resume
              text={`Atenção cliente amigo, senha ${senha}`}
            />
          </h2>
          <Button
            icon="pi pi-times"
            label="Fechar"
            onClick={() => setSenhaTelaCheia(false)}
            className="p-button p-button-rounded p-button-danger p-button-lg"
          />
        </div>
      </Dialog>

      <Dialog
        draggable={false}
        position="bottom-left"
        className="text-9xl text-center "
        header="Atenção cliente amigo, Prioridade "
        visible={senhaPrioridadeTelaCheia}
        modal={false}
        style={{ width: "100%" }}
        onHide={() => setSenhaPrioridadeTelaCheia(false)}
      >
        <div className="flex justify-center items-center gap-5">
          <h1 className="text-7xl animate__animated animate__pulse animate__infinite">
            PREFERENCIAL {senhaPrioridade}
          </h1>
          <h2 className="text-5xl">
            <Speech
              className="rs-play"
              lang="pt-BR"
              textAsButton
              displayText="Chamar"
              resume
              text={`Atenção senha preferencial ${senhaPrioridade}`}
            />
          </h2>
          <Button
            label="Fechar"
            onClick={() => setSenhaPrioridadeTelaCheia(false)}
            className="p-button p-button-rounded p-button-danger p-button-lg"
          />
        </div>
      </Dialog>

      <Dialog
        position="bottom"
        draggable={false}
        className="text-9xl text-center "
        header="Configuração"
        visible={displayConfig}
        modal={true}
        style={{ width: "100%" }}
        onHide={() => setDisplayConfig(false)}
      >
        <Configuracao />
      </Dialog>
    </>
  );
}

export default App;
