import React, { useEffect, useState, useRef } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import "./App.css";

import Logo from "./assets/img/logo.png";

import api from "./services/axios";

import api2 from "./services/axiosXmlNews";

import "animate.css";

import { useSpeechSynthesis } from "react-speech-kit";

import Configuracao from "./components/tabela/configuracao";

import moment from "moment/moment";

function App() {
  const toast = useRef(null);

  const { speak, voices } = useSpeechSynthesis();
  const [configTabela, setConfigTabela] = useState(
    JSON.parse(localStorage.getItem("tabela"))
  );

  const [ultimaAtualizacao, setUltimaAtualizacao] = useState();

  const [senhaTelaCheia, setSenhaTelaCheia] = useState(false);
  const [senhaPrioridadeTelaCheia, setSenhaPrioridadeTelaCheia] =
    useState(false);

  const [senha, setSenha] = useState(0);
  const [senhaPrioridade, setSenhaPrioridade] = useState(0);

  const [noticias, setNoticias] = useState([]);
  const [totalNoticias, setTotalNoticias] = useState(20);

  const [displayConfig, setDisplayConfig] = useState(false);

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [linha, setLinha] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10); // number of rows to display per page
  //const data = [/* your data */];
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const startIndexN = (linha - 1) * 1;
  const endIndexN = startIndexN + 1;

  const currentPageData = data.slice(startIndex, endIndex);

  const currentPageDataNews = noticias.slice(startIndexN, endIndexN);

  const incrementSenha = () => {
    setTimeout(() => {
      setSenhaTelaCheia(false);
    }, 15000);

    setSenhaTelaCheia(true);
    speak({
      text: `Atenção cliente amigo, senha número ${senha + 1}`,
      voice: voices[0],
    });
    return setSenha(senha + 1);
  };

  const decrementSenha = () => {
    return setSenha(senha - 1);
  };

  const decrementSenhaPrioridade = () => {
    return setSenhaPrioridade(senhaPrioridade - 1);
  };

  const incrementSenhaPrioridade = () => {
    setTimeout(() => {
      setSenhaPrioridadeTelaCheia(false);
    }, 15000);

    setSenhaPrioridadeTelaCheia(true);
    speak({
      text: `Atenção cliente amigo, senha preferencial número ${
        senhaPrioridade + 1
      }`,
      voice: voices[0],
    });
    return setSenhaPrioridade(senhaPrioridade + 1);
  };

  const getProdutos = () => {
    setRowsPerPage(configTabela?.loja?.numprodutosporpagina);
    return api
      .get(
        `/api_public/tabelapreco/display/${configTabela?.tabela?.id}/${configTabela?.loja?.idfilial}`
      )
      .then((r) => {
        setUltimaAtualizacao(moment(new Date()).format("DD/MM/YYYY HH:mm:ss"));
        setData(r.data);
        //   console.log(r.data);
      })
      .catch((error) => {});
  };

  const getNoticias = () => {
    var options = {
      method: "GET",

      url: "https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=449d30ca9a734c32bb60df79a52619ca",
      params: {
        /*  keywords: ["BBB", "Flamengo", "Fluminense", "Botafogo", "Vasco"],
        start_date: moment(new Date())
          .subtract("days", 30)
          .format("yyyy-MM-DD hh:mm:ss+00:00"),
        country: "BR",
        language: "pt",
        // category: "politics",
        apiKey: "nyNumK8-ymwjWFJX0o5iLRahJ0KelkbfrZReu85GxLigyEh5", */
      },
      /* headers: {
        apiKey: "nyNumK8-ymwjWFJX0o5iLRahJ0KelkbfrZReu85GxLigyEh5",
      },*/
    };

    api2
      .request(options)
      .then((r) => {
        setNoticias(r.data.articles);
        // console.log(r.data.data);
      })
      .catch((e) => {
        //   console.log(e);
        /*  toast.current.show({
          severity: "error",
          summary: "Erro ao buscar noticias",
          detail: `${e.message}`,
        }); */
      });
    /*
    api2
      .get(
        `https://newsapi.org/v2/top-headlines?country=br&apiKey=449d30ca9a734c32bb60df79a52619ca`
      )
      .then((response) => {
        setNoticias(response.data.articles);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Erro ao buscar noticias",
          detail: `${error.message}`,
        });
      });
      */
  };

  useEffect(() => {
    if (localStorage.getItem("tabela") === null) {
      setDisplayConfig(true);
    }

    setConfigTabela(JSON.parse(localStorage.getItem("tabela")));

    getNoticias();
    getProdutos();

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
    }, 15000);
    return () => clearInterval(intervalId);
  }, [totalPages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNoticias();
      getProdutos();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [totalPages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNoticias();
    }, 5400000);
    return () => clearInterval(intervalId);
  }, [totalPages]);

  return (
    <>
      <div>
        <Toast ref={toast} />
        <div>
          <Button
            style={{
              position: "fixed",
              left: "1px",
              bottom: "1px",
              zIndex: "3",
            }}
            onClick={() => setDisplayConfig(true)}
            className="p-button p-button-sm p-button-secondary"
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
                {configTabela?.tabela?.descricao? configTabela?.tabela?.descricao : configTabela?.tabela?.nome }
              </h1>
            </div>
          </>
        )}

        <div className="flex flex-col justify-around    ">
          <div className="w-64 h-max flex flex-col justify-evenly items-stretch gap-5  mx-1 px-1   ">
            <h3 className="text-white"> Última carga {ultimaAtualizacao}</h3>

            <img style={{ width: "100%" }} src={Logo} alt="Logo" />

            <div className="flex flex-col  items-center ">
              {configTabela?.habilitarSenhaNormal ? (
                <>
                  <div className="text-white flex flex-row justify-start items-start">
                    <div>
                      <h1>Normal</h1>
                    </div>

                    <Button
                      style={{ margin: "5px" }}
                      className="p-button p-button-rounded p-button-primary"
                      icon="pi pi-minus"
                      onClick={decrementSenha}
                    />
                    <Button
                      style={{ margin: "5px" }}
                      className="p-button p-button-rounded p-button-success "
                      icon="pi pi-plus"
                      onClick={incrementSenha}
                    />
                  </div>
                  <div
                    onClick={() => incrementSenha()}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <h2 className="text-4xl text-start text-white">SENHA</h2>
                    <h1 className=" text-8xl font-semibold text-white">
                      {senha}
                    </h1>
                  </div>
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
                      className="p-button p-button-rounded p-button-primary "
                      icon="pi pi-minus"
                      onClick={decrementSenhaPrioridade}
                    />
                    <Button
                      style={{ margin: "5px" }}
                      className="p-button p-button-rounded p-button-success "
                      icon="pi pi-plus"
                      onClick={incrementSenhaPrioridade}
                    />
                  </div>
                  <div
                    onClick={() => incrementSenhaPrioridade()}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2 className="text-4xl text-start text-white">
                      PREFERENCIAL
                    </h2>
                    <h1 className=" text-8xl font-semibold text-white">
                      {senhaPrioridade}
                    </h1>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            style={{ width: "80%", position: "fixed", top: "1%", left: "20%" }}
          >
            <table className="min-w-full  border-separate border-spacing-1">
              <thead>
                <tr className="bg-opacity-75">
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
                  <tr
                    className="  even:bg-gray-200 odd:bg-yellow-300 h-8"
                    key={index}
                  >
                    <td className="  text-black border-spacing-8 border border-slate-700 text-center  font-semibold text-3xl  ">
                      {row?.ean ? row?.ean : row?.codigo}
                    </td>
                    <td className=" text-black border-spacing-8 border border-slate-700 text-start  font-semibold text-3xl ">
                      {row.precopromocao || row.precopromocaofamilia ? (
                        <>
                          <div className="flex justify-between animate__animated animate__flash  p-1 my-1 ">
                            {row.produto}
                            <h4 className="text-center text-2xl text-red-500 bg-yellow-400 font-bold rounded-full p-2 my-1">
                              PROMOÇÃO
                            </h4>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between p-1 my-1 ">
                            {row.produto}
                          </div>
                        </>
                      )}
                    </td>

                    <td className="text-black border-spacing-10 border border-slate-700 text-center text-opacity-100  font-semibold text-4xl">
                      {row.precopromocaofamilia || row.precopromocao ? (
                        <>
                          {row.precopromocaofamilia
                            ? new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(row.precopromocaofamilia)
                            : new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(row.precopromocao)}
                        </>
                      ) : (
                        <>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(row.preco)}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {currentPageDataNews.length > 0 ? (
          <>
            <div className="w-full">
              <div className="ticker-wrapper">
                <div className="bigHeading"> Notícias </div>

                <div className=" flex  items-center justify-evenly  text-update">
                  <div className="">
                    {currentPageDataNews.map((m, i) => (
                      <h1 key={i}>{m?.title}</h1>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <Dialog
          style={{ height: "100vw", width: "55vh" }}
          draggable={false}
          position="top-left"
          className="text-5xl text-center  "
          header="Atenção cliente amigo"
          visible={senhaTelaCheia}
          modal={false}
          onHide={() => setSenhaTelaCheia(false)}
        >
          <div className="flex flex-col justify-center items-center gap-5 ">
            <div className="flex flex-row gap-5">
              <Button
                className="p-button p-button-rounded p-button-danger"
                icon="pi pi-minus"
                onClick={() => setSenha(senha - 1)}
              />
              <Button
                className="p-button p-button-rounded p-button-success"
                icon="pi pi-plus"
                onClick={() => setSenha(senha + 1)}
              />
            </div>
            <h4 className="text-4xl animate__animated animate__pulse animate__infinite">
              SENHA
            </h4>
            <h1 className="text-9xl animate__animated animate__pulse animate__infinite">
              {senha}
            </h1>
            <h2 className="text-5xl m-2">
              <Button
                className="p-button p-button-rounded p-button-success p-button-lg"
                icon="pi pi-play"
                label="Chamar"
                onClick={() =>
                  speak({
                    text: `Atenção senha número ${senha}`,
                    voice: voices[0],
                  })
                }
              />
            </h2>
            {/*
            <Button
              icon="pi pi-times"
              label="Fechar"
              onClick={() => setSenhaTelaCheia(false)}
              className="p-button p-button-rounded p-button-danger p-button-lg"
              /> */}
          </div>
        </Dialog>

        <Dialog
          style={{ height: "100vw", width: "50vh" }}
          draggable={false}
          position="top-left"
          className="text-5xl text-center "
          header="Atenção cliente amigo, Prioridade "
          visible={senhaPrioridadeTelaCheia}
          modal={false}
          onHide={() => setSenhaPrioridadeTelaCheia(false)}
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row gap-5">
              <Button
                className="p-button p-button-rounded p-button-danger"
                icon="pi pi-minus"
                onClick={() => setSenhaPrioridade(senhaPrioridade - 1)}
              />
              <Button
                className="p-button p-button-rounded p-button-success"
                icon="pi pi-plus"
                onClick={() => setSenhaPrioridade(senhaPrioridade + 1)}
              />
            </div>
            <h4 className="text-4xl animate__animated animate__pulse animate__infinite">
              SENHA PREFERENCIAL
            </h4>
            <h1 className="text-9xl animate__animated animate__pulse animate__infinite">
              {senhaPrioridade}
            </h1>
            <h2 className="text-5xl">
              <Button
                className="p-button p-button-rounded p-button-success p-button-lg"
                icon="pi pi-play"
                label="Chamar"
                onClick={() =>
                  speak({
                    text: `Atenção senha preferencial número ${senhaPrioridade}`,
                    voice: voices[0],
                  })
                }
              />
            </h2>
            {/*
            <Button
              label="Fechar"
              onClick={() => setSenhaPrioridadeTelaCheia(false)}
              className="p-button p-button-rounded p-button-danger p-button-lg"
              /> */}
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
      </div>
    </>
  );
}

export default App;
