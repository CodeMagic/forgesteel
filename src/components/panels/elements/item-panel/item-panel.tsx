import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Item } from '../../../../models/item';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';

import './item-panel.scss';

interface Props {
	item: Item;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const ItemPanel = (props: Props) => {
	try {
		return (
			<div className='item-panel' id={props.mode === PanelMode.Full ? props.item.id : undefined}>
				<HeaderText level={1}>{props.item.name || 'Unnamed Item'}</HeaderText>
				<Markdown text={props.item.description} />
				{
					props.mode === PanelMode.Full ?
						props.item.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
