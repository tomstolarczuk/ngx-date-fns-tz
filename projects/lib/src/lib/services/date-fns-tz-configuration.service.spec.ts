import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { de, pl } from 'date-fns/locale';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { DateFnsTzModule } from '../date-fns-tz.module';

@Component({
    template: `
    <p id="global">{{ date | dfnsFormatInTimeZone: null:'EEE MMM d yyyy HH:mm:ss zzz' }}</p>
    <p id="param">{{ date | dfnsFormatInTimeZone: null:'EEE MMM d yyyy HH:mm:ss zzz':options }}</p>
  `,
    standalone: false
})
class TestHostComponent {
  date?: Date;
  options = { locale: pl, timeZone: 'Australia/Sydney' };
}

describe('DateFnsConfigurationService', () => {
  let mockService: DateFnsTzConfigurationService;

  beforeEach(
    waitForAsync(() => {
      mockService = new DateFnsTzConfigurationService();
      TestBed.configureTestingModule({
        declarations: [TestHostComponent],
        imports: [DateFnsTzModule.forRoot()],
        providers: [{ provide: DateFnsTzConfigurationService, useValue: mockService }]
      }).compileComponents();
    })
  );

  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use global setting in DateFnsTzConfigurationService', () => {
    mockService.timeZone = 'UTC';
    component.date = new Date('2022-08-25T10:40:20Z');
    element = fixture.nativeElement.querySelector('#global');
    fixture.detectChanges();
    expect(element.textContent).toBe('Thu Aug 25 2022 10:40:20 UTC');
  });

  it('should display German date on global locale & timezone change', () => {
    mockService.config = { locale: de, timeZone: 'Europe/Berlin' };
    component.date = new Date('2022-08-25T10:46:20Z');
    element = fixture.nativeElement.querySelector('#global');
    fixture.detectChanges();
    expect(element.textContent).toBe('Do. Aug. 25 2022 12:46:20 MESZ');
  });

  it('should display Polish locale date & timezone on explicit locale & tz change', () => {
    component.date = new Date('2022-08-25T10:46:20Z');
    element = fixture.nativeElement.querySelector('#param');
    fixture.detectChanges();
    expect(element.textContent).toBe('czw. sie 25 2022 20:46:20 GMT+10');
  });
});
