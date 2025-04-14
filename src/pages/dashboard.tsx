import React from "react";
import "../App.css";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="nba-container">
        <header className="nba-header">
          <h1 className="nba-title">National Basketball Association (NBA)</h1>
        </header>

        <section className="nba-history">
          <h2 className="section-title">História e Fundação</h2>
          <p className="history-text">
            A <strong>National Basketball Association (NBA)</strong> é a
            principal liga de basquete profissional do mundo. Fundada em
            <strong>6 de junho de 1946</strong> como{" "}
            <em>Basketball Association of America (BAA)</em>, tornou-se NBA após
            fusão com a <em>National Basketball League (NBL)</em> em 1949. A NBA
            é composta por 30 times e é reconhecida como a liga de basquete mais
            prestigiosa, influente e assistida globalmente.
          </p>
          <p className="history-text">
            Nos primeiros anos, a liga passou por várias dificuldades, incluindo
            baixa audiência e falta de popularidade. No entanto, com a chegada
            de estrelas como <strong>Bill Russell</strong>,{" "}
            <strong>Wilt Chamberlain</strong> e, posteriormente,{" "}
            <strong>Magic Johnson</strong> e <strong>Michael Jordan</strong>, a
            NBA rapidamente se tornou uma potência global.
          </p>
          <p className="history-text">
            A NBA atualmente não apenas organiza as temporadas de basquete, mas
            também se envolve em questões sociais, culturais e econômicas ao
            redor do mundo, sendo uma referência em esportes e entretenimento.
          </p>
        </section>

        <section className="nba-organization">
          <h2 className="section-title">Organização e Estrutura</h2>
          <p className="organization-text">
            A NBA é composta por duas conferências principais:{" "}
            <strong>Conferência Leste</strong> e{" "}
            <strong>Conferência Oeste</strong>, cada uma com 15 equipes. Cada
            temporada é dividida em <strong>temporada regular</strong> e{" "}
            <strong>playoffs</strong>, culminando na disputa pelo campeonato, o{" "}
            <strong>NBA Finals</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
