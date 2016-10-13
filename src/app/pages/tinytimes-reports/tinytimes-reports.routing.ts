import {Routes, RouterModule} from "@angular/router";
import {TinytimesReports} from "./tinytimes-reports.component";
import {Hour24ChannelDailySummaryComponent} from "./gf-channel/hour-24-channel-daily-summary.component";
import {Hour24ChannelDailyDetailsComponent} from "./gf-channel/hour-24-channel-daily-details.component";
import {Hour24ChannelWeeklySummaryComponent} from "./gf-channel/hour-24-channel-weekly-summary.component";
import {AnchorLiveShowDayComponent} from "./anchor/anchor-live-show-day.component";
import {MainHotUserClickComponent} from "./top-position/main-hot-user-click.component"
import {AnchorLiveShowComponent} from "./anchor/anchor-live-show.component";
import {AnchorBrokerFlatComponent} from "./broker/anchor-broker-flat.component";
import {BrokerLiveShowDayComponent} from "./broker/broker-live-show-day.component";
import {AnchorLivePrivateComponent} from "./anchor/anchor-live-private.component";
import {AnchorLiveEntryComponent} from "./anchor/anchor-live-entry.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TinytimesReports,
    children: [
      {path: '', redirectTo: 'gf-channel/24-hour-channel-daily-summary', pathMatch: 'full'},
      {path: 'gf-channel/24-hour-channel-daily-summary', component: Hour24ChannelDailySummaryComponent},
      {path: 'gf-channel/24-hour-channel-daily-details', component: Hour24ChannelDailyDetailsComponent},
      {path: 'gf-channel/24-hour-channel-weekly-summary', component: Hour24ChannelWeeklySummaryComponent},
      {path: 'anchor/anchor-live-show-day', component: AnchorLiveShowDayComponent},
      {path: 'anchor/anchor-live-show', component: AnchorLiveShowComponent},
      {path: 'anchor/anchor-live-private', component: AnchorLivePrivateComponent},
      {path: 'anchor/anchor-live-entry', component: AnchorLiveEntryComponent},
      {path: 'broker/anchor-broker-flat', component: AnchorBrokerFlatComponent},
      {path: 'broker/broker-live-show-day', component: BrokerLiveShowDayComponent},
      {path: 'top-position/main-hot-user-click', component: MainHotUserClickComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
