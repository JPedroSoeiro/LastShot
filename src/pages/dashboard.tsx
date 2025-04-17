import React from "react";
import "../App.css";

const Dashboard: React.FC = () => {
  return (
    <div className="nba-container">
      <section className="dashboard-section section-history">
        <div className="section-content">
          <h2 className="section-title"> História da NBA</h2>
          <p className="section-text">
            A NBA nasceu em 1946 como BAA e se fundiu com a NBL em 1949. Desde
            então, se transformou em uma das maiores ligas esportivas do mundo.
          </p>
          <p className="section-text">
            Com momentos históricos, como os títulos dos Bulls de Michael
            Jordan, a rivalidade Lakers x Celtics e a ascensão global do
            basquete, a NBA moldou a história do esporte.
          </p>
        </div>
      </section>

      <section className="dashboard-section section-legends">
        <div className="section-content">
          <h2 className="section-title"> Maiores Lendas</h2>
          <ul className="legends-list">
            <li>
              <strong>Michael Jordan</strong> — Símbolo da excelência
              competitiva.
            </li>
            <li>
              <strong>LeBron James</strong> — Versatilidade e longevidade sem
              precedentes.
            </li>
            <li>
              <strong>Kobe Bryant</strong> — Ícone de dedicação e mentalidade
              vencedora.
            </li>
            <li>
              <strong>Bill Russell</strong> — 11 títulos, referência defensiva
              histórica.
            </li>
            <li>
              <strong>Magic Johnson</strong> e <strong>Larry Bird</strong> —
              Reergueram a liga nos anos 80.
            </li>
          </ul>
        </div>
      </section>

      <section className="dashboard-section section-structure">
        <div className="section-content">
          <h2 className="section-title"> Estrutura da Liga</h2>
          <p className="section-text">
            A NBA possui <strong>30 equipes</strong> divididas em duas
            conferências: Leste e Oeste. Cada conferência é dividida em 3
            divisões.
          </p>
          <p className="section-text">
            A temporada regular tem 82 jogos, seguida pelos <em>playoffs</em> e
            as Finais da NBA, disputadas entre os campeões de cada conferência.
          </p>
        </div>
      </section>

      <section className="dashboard-section section-dynasties">
        <div className="section-content">
          <h2 className="section-title"> Títulos e Dinastias</h2>
          <p className="section-text">
            Ao longo da história, algumas franquias dominaram eras inteiras: os{" "}
            <strong>Celtics</strong> com 17 títulos, os <strong>Lakers</strong>{" "}
            também com 17, e os <strong>Bulls</strong> de Jordan nos anos 90.
          </p>
          <p className="section-text">
            Dinastias recentes incluem o <strong>Golden State Warriors</strong>,
            que conquistou 4 títulos entre 2015 e 2022, com{" "}
            <strong>Steph Curry</strong>, Klay Thompson e Draymond Green.
          </p>
        </div>
      </section>

      <section className="dashboard-section section-global">
        <div className="section-content">
          <h2 className="section-title"> Expansão Global</h2>
          <p className="section-text">
            A NBA é a liga mais globalizada do planeta. Jogadores de mais de 40
            países já atuaram na liga, como <strong>Dirk Nowitzki</strong>,{" "}
            <strong>Yao Ming</strong>, <strong>Giannis Antetokounmpo</strong> e{" "}
            <strong>Luka Dončić</strong>.
          </p>
          <p className="section-text">
            A NBA realiza jogos internacionais, tem academias na África, China e
            Índia, e transmite para mais de 200 países em 40 idiomas.
          </p>
        </div>
      </section>

      <section className="dashboard-section section-culture">
        <div className="section-content">
          <h2 className="section-title"> Cultura e Impacto</h2>
          <p className="section-text">
            A NBA vai além das quadras: é referência em moda, música, redes
            sociais e ativismo social. Jogadores como{" "}
            <strong>LeBron James</strong> usam sua influência para falar de
            educação, igualdade racial e justiça social.
          </p>
          <p className="section-text">
            Eventos como o <em>All-Star Weekend</em> e a <em>NBA Draft</em> se
            tornaram grandes atrações culturais, aproximando a liga de jovens no
            mundo todo.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
