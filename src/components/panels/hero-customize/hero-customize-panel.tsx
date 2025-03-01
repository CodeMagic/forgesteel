import { Feature, FeatureData } from '../../../models/feature';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Divider } from 'antd';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { Expander } from '../../controls/expander/expander';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';

import './hero-customize-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	addFeature: (feature: Feature) => void;
	deleteFeature: (feature: Feature) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const HeroCustomizePanel = (props: Props) => {
	try {
		return (
			<div className='hero-customize-panel'>
				{
					props.hero.features.filter(f => f.id !== 'default-language').map(f => (
						<Expander
							key={f.id}
							title={f.name}
							extra={[
								<DangerButton key='delete' mode='icon' onConfirm={() => props.deleteFeature(f)} />
							]}
						>
							<FeaturePanel
								feature={f}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								mode={PanelMode.Full}
								setData={props.setFeatureData}
							/>
						</Expander>
					))
				}
				{props.hero.features.filter(f => f.id !== 'default-language').length > 0 ? <Divider /> : null}
				<DropdownButton
					label='Add a new feature'
					items={[
						{ key: FeatureType.LanguageChoice, label: <div className='ds-text centered-text'>Language</div> },
						{ key: FeatureType.Perk, label: <div className='ds-text centered-text'>Perk</div> },
						{ key: FeatureType.SkillChoice, label: <div className='ds-text centered-text'>Skill</div> }
					]}
					onClick={key => {
						let feature = null;
						switch (key) {
							case FeatureType.LanguageChoice:
								feature = FactoryLogic.feature.createLanguageChoice({
									id: Utils.guid()
								});
								break;
							case FeatureType.Perk:
								feature = FactoryLogic.feature.createPerk({
									id: Utils.guid(),
									lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
								});
								break;
							case FeatureType.SkillChoice:
								feature = FactoryLogic.feature.createSkillChoice({
									id: Utils.guid(),
									listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
								});
								break;
						}
						if (feature) {
							props.addFeature(feature);
						}
					}}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
