import { Component, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsyncPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Activity, ActivityFlow } from '../../core/model';
import { Observable, catchError, of, tap } from 'rxjs';
import { ActivityService } from './activity.service';

@Component({
  selector: 'esync-activity-log',
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe,
    MatProgressSpinner,
    NgTemplateOutlet,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent implements OnInit {
  activityLog$!: Observable<Activity[]>;
  hasError = false;
  displayedColumns: string[] = ['flow', 'description', 'createdDate'];
  dataSource!: MatTableDataSource<Activity>;
  private _paginator!: MatPaginator;
  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    if (mp) {
      this._paginator = mp;
      this.dataSource.paginator = this._paginator;
    }
  }
  readonly ACTIVITY_FLOW = ActivityFlow;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityLog$ = this.activityService.getActivityLog().pipe(
      tap((activityLog) => {
        this.dataSource = new MatTableDataSource<Activity>(activityLog);
        // this.dataSource = new MatTableDataSource<Activity>([
        //   {
        //     flow: this.ACTIVITY_FLOW.SHOPIFY_TO_EBAY,
        //     description: "djsjdsjsdjsjdsdsd",
        //     createdDate: '2011-10-05T14:48:00.000Z',
        //     status: ActivityStatus.SUCCESS
        //   }
        // ]);
      }),
      catchError(() => {
        this.hasError = true;
        return of([]);
      }),
    );
  }
}
