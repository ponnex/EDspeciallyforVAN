<template>
	<section id="entourage" class="section">
		<div class="header">
			<span class="header-sub">
				GROOMSMEN & BRIDESMAIDS
			</span>
			<span class="header-heading">
				ENTOURAGE
			</span>
		</div>
		<div class="content">
			<div class="entourage">
				<span class="name">NICHOLE JOHN A. TUBA</span>
				<span class="role">Head of Entourage</span>
			</div>
			<div class="entourage">
				<span class="name">JAIREH JAMES U. PAHALLA</span>
				<span class="name">CHARLENE MAE P. PAHALLA</span>
				<span class="role">Man & Matron of Honor</span>
			</div>
			<div class="entourage">
				<span class="name">ROJIEM REY CUENCA</span>
				<span class="name">ISAMIE BACASMOT</span>
				<span class="role">Best Man & Maid of Honor</span>
			</div>
			<div class="entourage-wrapper">
				<div class="entourage">
					<span class="name">EMMANUEL FRANCIS RAMOS</span>
					<span class="name">JOVER MADRIDANO</span>
					<span class="name">MARK DENZEL BALABAG</span>
					<span class="name">KHEUZ VANN FUENTES</span>
					<span class="name">ROMAFEL ROXAS</span>
					<span class="role">Groomsmen</span>
				</div>
				<div class="entourage">
					<span class="name">CHARLENE SHIN RAVIDAS</span>
					<span class="name">LYNDIL ANN BALABAG</span>
					<span class="name">GERALD VENTA</span>
					<span class="name">MARJUN REY MALAYAN</span>
					<span class="role">Bridesmaids</span>
				</div>
			</div>
			<div class="entourage">
				<span class="name">BLESSIE MYRRH ESTREMOS</span>
				<span class="name">SOPHIA ABIGAIL ABARCAS</span>
				<span class="name">KRYSTELLE LUCIA SAN MIGUEL</span>
				<span class="name">RILEY QUIÑO</span>
				<span class="name">ZADEA MARI VERDEFLOR</span>
				<span class="role">Junior Bridesmaids</span>
			</div>
			<div class="entourage">
				<span class="name">JUHONEY GRACE PANTONIAL</span>
				<span class="role">Wedding Banner Bearer</span>
			</div>
		</div>
		<div class="header">
			<span class="header-sub">
				WITNESSES
			</span>
			<span class="header-heading">
				ENTOURAGE
			</span>
		</div>
		<div class="content">
			<div class="entourage-wrapper">
				<div class="entourage">
					<span class="name">ADRIAN & RUBY JEAN ABARCAS</span>
					<span class="name">AGNES JEAN BACARRISAS</span>
					<span class="name">ALBERT & JEANNA BALABAG</span>
					<span class="name">ALLAN JOHN & EMERALD MIÑOZA</span>
					<span class="name">ANABELLE PASCO</span>
					<span class="name">ARNOLD & ESTRELLA PAHALLA</span>
					<span class="name">BRADLEY & ANGELA MCDOUGLE</span>
					<span class="name">CECILIO & GENOVEVA TUBA</span>
					<span class="name">DR. DORCAS MENOC</span>
					<span class="name">EDUARDO & DR. GERLINDA CORPUZ</span>
					<span class="name">ELLOVER & DR. RIZHALY MAANDIG</span>
					<span class="name">HERMES & NILMIL BACASMOT</span>
					<span class="name">HON. CLIVE & HON. RINA QUIÑO</span>
					<span class="name">ISRAEL & DR. DETTA CABREZOS</span>
					<span class="name">JAY & MARY JEAN CASTRO</span>
					<span class="name">JENNIFER ALFONSO</span>
				</div>
				<div class="entourage">
					<span class="name">JIMMY & PACITA OBSIOMA</span>
					<span class="name">JOCELYN BAYLON</span>
					<span class="name">JOEL SIMENE</span>
					<span class="name">JOHN & DELIA PASCUAL</span>
					<span class="name">JOVIE & MARY ANN DUMON</span>
					<span class="name">KEEVEE & AUDREY SAN MIGUEL</span>
					<span class="name">LINO & NERISSA ACIERTO</span>
					<span class="name">MARCO & EDNA PARPAN</span>
					<span class="name">MARCO & RIZA VERDEFLOR</span>
					<span class="name">MARYMAE SUMINGUIT</span>
					<span class="name">MELITON JR. & SHIRLEY PANTONIAL</span>
					<span class="name">MIKE & ANABELLA HICKMAN</span>
					<span class="name">ROBERT & MARY GRACE CUENCA</span>
					<span class="name">SERGIO & ELENA ABELLA</span>
					<span class="name">WILFREDO & LAURENCE BIBERA</span>
					<span class="name">WINLOVE & ARMALOU PABUALAN</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class EntourageComponent extends Vue {}
</script>

<style lang="scss" scoped>
.section {
	padding: 24px;
	padding-top: 100px;
	padding-bottom: 48px;
	height: 100%;

	@media (max-width: 768px) {
		height: 100%;
		padding: 16px;
		padding-top: 60px;
		padding-bottom: 24px;
	}
}

.header {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
	padding-top: 20px;
	text-align: center;

	&-sub {
		font-size: 16px;
		color: #845F2D;
	}

	&-heading {
		font-size: 48px;
	}

	@media (max-width: 768px) {
		padding-top: 16px;
		gap: 8px;
	}
}

.content {
	display: flex;
	flex-direction: column;
	max-width: 1440px;
	margin: 0 auto;
	gap: 48px;
	margin: 82px 0px;

	.entourage {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 12px;

		&-wrapper {
			display: flex;
			justify-content: space-between;
			padding: 0px 50px;

			.entourage:first-of-type {
				align-items: flex-start;
				text-align: left;

				.role {
					align-self: center;
				}
			}

			.entourage:last-of-type {
				align-items: flex-end;
				text-align: end;

				.role {
					align-self: center;
				}
			}
		}

		.name {
			font-size: 28px;
			text-transform: uppercase;
			text-align: center;
		}
		.role {
			font-family: 'Great Vibes';
			font-size: 24px;
			letter-spacing: 0.28em;
			color: #845F2D;
			text-align: center;
		}
	}

	@media (max-width: 768px) {
		flex-direction: column;
		margin: 64px 0px;

		.entourage {
			&-wrapper {
				flex-direction: column;
				gap: 48px;

				.entourage:first-of-type {
					align-items: center;
					text-align: center;
				}

				.entourage:last-of-type {
					align-items: center;
					text-align: center;
				}
			}

			.name {
				font-size: 20px;
			}
			.role {
				font-size: 20px;
				letter-spacing: 0.18em;
			}
		}
	}
}
</style>
